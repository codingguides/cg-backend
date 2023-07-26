"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const xrm_core_1 = require("@401_digital/xrm-core");
class BaseService {
    getQuery(query) {
        const result = new xrm_core_1.RequestQuery();
        result.pagination = this.getPaginationQuery(query.pagination);
        result.sort = this.getSortQuery(query.sort);
        result.filter = this.getFilterQuery(query.filter);
        result.projection = this.getProjection(query.projection);
        return result;
    }
    getPaginationQuery(query) {
        query = query && typeof query === "string" ? JSON.parse(query) : null;
        const pagination = new xrm_core_1.Pagination();
        pagination.page = query && query.page ? Number.parseInt(query.page.toString(), 10) : 1;
        pagination.limit = query && query.limit ? Number.parseInt(query.limit.toString(), 10) : 10;
        return pagination;
    }
    getSortQuery(query) {
        if (query)
            return JSON.parse(query);
        return {};
    }
    getFilterQuery(query) {
        if (!query)
            return {};
        return JSON.parse(query);
    }
    getProjection(projection) {
        if (projection) {
            return xrm_core_1.ObjectUtils.toProjectionObject(projection);
        }
        return {};
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=service.js.map