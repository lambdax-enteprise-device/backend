const db = require("../../data/db-config.js");

module.exports = {
  signUp
};

async function signUp(company, user) {
  const [companyId] = await db("companies").insert(company, "id");
  user["company_id"] = companyId;

  const [userId] = await db("users").insert(user, "id");

  //* Creation of Administrators group and role, assign user to group and group to role
  const [groupdId] = await db("groups").insert({
    company_id: companyId,
    group_name: "Administrators"
  });
  const [roleId] = await db("roles").insert({
    company_id: companyId,
    name: "Administrators",
    description:
      "Role used for Administrators of company. Full permissions given",
    assignment: "Company-wide",
    access_level: 1
  });
  await db("role_groups").insert({
    group_id: groupdId,
    role_id: roleId
  });
  await db("users_groups").insert({
    user_id: userId,
    group_id: groupdId
  });
  return findById(companyId);
}
