const db = require("../../data/db-config.js");

const generateToken = require("../../utils/auth/generateToken");

module.exports = {
  signUp,
  find
};

async function signUp(company, user) {
  company.active = true;
  const [companyId] = await db("companies").insert(company, "id");
  user["company_id"] = companyId;

  const [userId] = await db("users").insert(user, "id");

  //* Creation of Administrators group and role, assign user to group and group to role
  const [groupId] = await db("groups").insert(
    {
      company_id: companyId,
      group_name: "Administrators"
    },
    "id"
  );
  const [roleId] = await db("roles").insert(
    {
      company_id: companyId,
      name: "Administrators",
      description:
        "Role used for Administrators of company. Full permissions given",
      assignment: "Company",
      access_level: 5
    },
    "id"
  );
  const [roleGroupId] = await db("role_groups").insert(
    {
      group_id: groupId,
      role_id: roleId
    },
    "id"
  );
  const [usersGroupsId] = await db("users_groups").insert(
    {
      user_id: userId,
      group_id: groupId
    },
    "id"
  );

  user.company_name = company.company_name;
  return user;
}

async function find(filter) {
  return db("users").where(filter);
}
