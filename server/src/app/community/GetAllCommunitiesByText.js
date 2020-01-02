const Operation = require("src/app/Operation");

class GetAllCommunitiesByText extends Operation {
  constructor({ communitiesRepository }) {
    super();
    this.communitiesRepository = communitiesRepository;
  }

  async execute(searchText = "", page = 1, limit = 10) {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const communities = await this.communitiesRepository.getAllByText({
        page: page,
        limit: limit,
        offset: (page - 1) * limit,
        searchText: searchText
      });
      this.emit(SUCCESS, communities);
    } catch (error) {
      this.emit(ERROR, error);
    }
  }
}

GetAllCommunitiesByText.setOutputs(["SUCCESS", "ERROR"]);

module.exports = GetAllCommunitiesByText;
