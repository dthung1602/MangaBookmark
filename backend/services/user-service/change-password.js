export default async function (user, password) {
  user.password = password;
  return user.save();
}
