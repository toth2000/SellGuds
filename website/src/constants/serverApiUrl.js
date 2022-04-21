export const apiProductionUrl = "http://localhost:5000";

/** Auth Route */

export const signInUrl = "/auth/login";
export const registerUrl = "/auth/register";
export const refreshTokenUrl = "/auth/refresh_token";

// auth/:id
export const getUserByIdUrl = "/auth";

/** Post Route */

export const createPostUrl = "/post/create";

// post/delete/:id
export const deletePostUrl = "/post/delete";

// post/sold/:id
export const markSoldUrl = "/post/sold";

// post/purchase/:id
export const purchasePostUrl = "/post/purchase";

export const fetchAllPostUrl = "/post/all";

// post/:id
export const fetchPostByIdUrl = "/post";

// post/:id
export const fetchUserPostUrl = "/post/user";

// post/purchase/:id
export const fetchUserPurchaseUrl = "/post/user/purchase";

export const searchPostUrl = '/post/search'
