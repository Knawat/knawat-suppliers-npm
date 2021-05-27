import Request from './request';

/**
 * A Class Library for handling Knawat MarketPlace related Operations.
 *
 * @class WeightRules
 */
class WeightRules extends Request {
  /**
   * Creates an instance of WeightRules.
   *
   */
  constructor(...args) {
    super('Basic', ...args);
  }

  /**
   * Get all Weight rules
   *
   * @param {object} { limit = 20, page = 1, sort = null}
   * @returns
   * @see https://knawat-suppliers.restlet.io/#operation_get_all_weight_rules
   * @memberof WeightRules
   */
  getWeightRules(queryParams = {}) {
    return this.$fetch('GET', '/weight_rules', { queryParams });
  }

  /**
   * Create weight rule
   *
   * @param {object}  weightRules  { "keyword" : "Shirt", "weight": 5 }
   * @returns
   * @see https://knawat-suppliers.restlet.io/#operation_create_a_supplier
   * @memberof WeightRules
   */
  createWeightRule(queryParams) {
    return this.$fetch('POST', '/weight_rules', { queryParams });
  }

  /**
   * Update weight rule by id
   *
   * @param {*} id
   * @param {*} weightRules
   * @returns
   * @see https://knawat-suppliers.restlet.io/#operation_update_weight_rule
   * @memberof WeightRules
   */
  updateWeightRule(id, weightRules) {
    return this.$fetch('PUT', `/weight_rules/${id}`, {
      body: JSON.stringify({ weightRules }),
    });
  }

  /**
   * Delete weight rule by id
   *
   * @param {*} id
   * @returns
   * @see https://knawat-suppliers.restlet.io/#operation_delete_weight_rule
   * @memberof WeightRules
   */
  deleteWeightRule(id) {
    return this.$fetch('DELETE', `/weight_rules/${id}`);
  }
}

module.exports = WeightRules;
