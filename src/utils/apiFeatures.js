export class ApiFeatures {
  constructor(mongooseQuery, searchQuery) {
    (this.mongooseQuery = mongooseQuery),
    (this.searchQuery = searchQuery);
  }

  pagination() {
    if (this.searchQuery.page <= 0) this.searchQuery.page = 1;
    let page = this.searchQuery.page * 1 || 1;
    let limit = 10;
    let skip = (page - 1) * limit;
    this.pageNum = page;
    // this.prevuoisP = page-1;
    this.nexP = page+1;
    this.mongooseQuery.skip(skip).limit(limit);
    return this
  }

  search () {
    if(this.searchQuery.keyword) {
        this.mongooseQuery.find({$or: [
            {title:{ $regex: this.searchQuery.keyword}},
            {description:{ $regex: this.searchQuery.keyword}},
        ]})
      }
      return this
  }

}
