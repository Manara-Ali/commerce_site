class APIFeatures {
  constructor(query, queryParameters) {
    this.query = query;
    this.queryParameters = queryParameters;
  }

  filter() {
    let queryObj = { ...this.queryParameters };

    const excludedParameters = ["sort", "page", "limit", "fields"];

    excludedParameters.forEach((element) => {
      delete queryObj[element];
    });

    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(
      /\b(lt|lte|gt|gte|eq|ne)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  // //////// SORTING
  sort() {
    if (this.queryParameters.sort) {
      const sortParams = this.queryParameters.sort.split(",").join(" ");
      this.query = this.query.sort(sortParams);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  // ///////// FIELD SELECTING
  fieldLimit() {
    if (this.queryParameters.fields) {
      const selectedFields = this.queryParameters.fields.split(",").join(" ");
      this.query = this.query.select(selectedFields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  // ////////// PAGINATION
  paginate() {
    const page = Number(this.queryParameters.page) || 1;
    const limit = Number(this.queryParameters.limit) || 5;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
