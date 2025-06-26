// Create main admin if not exists
const mainAdminEmail = "mainadmin@nagarsaathi.com";
const mainAdminPassword = "main@123";

const mainAdmin = await User.findOne({ email: mainAdminEmail });

if (!mainAdmin) {
  const user = new User({
    name: "Main Admin",
    email: mainAdminEmail,
    password: mainAdminPassword,
    ward: "All", // or leave it blank if not needed
    phone: "9999999999",
    role: "admin"
  });

  await user.save();
  console.log(`✅ Main Admin created: ${mainAdminEmail} | Password: ${mainAdminPassword}`);
} else {
  console.log(`⚠️ Main Admin already exists`);
}
