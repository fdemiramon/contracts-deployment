const getNetworkDeploymentStatus = (network) => {
  const addressFilePath = path.join("networks", network.toLowerCase(), ".txt");
  try {
    if (fs.existsSync(addressFilePath)) {
      const address = fs.readFileSync(addressFilePath, "utf8").trim();
      return "Deployed at " + address;
    }
    return "Not deployed";
  } catch (error) {
    console.error(`Error checking network ${network}:`, error);
    return "Deployment status unknown";
  }
};
