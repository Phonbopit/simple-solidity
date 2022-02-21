const main = async () => {
  const HelloWorld = await hre.ethers.getContractFactory("HelloWorld");
  const helloWorld = await HelloWorld.deploy(1); // set default to 1
  await helloWorld.deployed();

  console.log(`Contract deploying to ${helloWorld.address}`);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
