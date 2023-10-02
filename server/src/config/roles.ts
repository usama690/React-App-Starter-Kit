const roles = ["CUSTOMER", "VENDOR", "ADMIN"];

const roleRights = new Map();

roleRights.set(roles[0], ["logout", "profile", "getAllProducts", "getSearchProducts", "categories"]);
roleRights.set(roles[1], ["logout", "profile", "categories", "addProduct", "getUserProducts", "updateProduct", "deleteProduct"]);
roleRights.set(roles[2], ["logout", "categories", "profile"]);

export { roles, roleRights };
