import { ethers } from "hardhat";
import chai from "chai";
const { expect } = chai;
import { SimpleCardNFTFactory } from "../typechain-types";
import { Signer } from "ethers";

describe("SimpleCardNFTFactory", () => {
  let simpleCardNFTFactory: SimpleCardNFTFactory;
  let owner: Signer;
  let addr1: Signer;
  let addr2: Signer;

  beforeEach(async () => {
    const SimpleCardNFTFactoryFactory = await ethers.getContractFactory(
      "SimpleCardNFTFactory"
    );
    simpleCardNFTFactory =
      (await SimpleCardNFTFactoryFactory.deploy()) as SimpleCardNFTFactory;
    [owner, addr1, addr2] = await ethers.getSigners();
  });

  describe("Register Simple Card Info", () => {
    it("Should register simple card info", async () => {
      await simpleCardNFTFactory
        .connect(addr1)
        .registerSimpleCardInfo(
        "Robin",
        "robin582@careerzen.org",
        "Blockchain_Velly",
        "@Robin_Careerzen",
        "@Careerzen",
        "Careerzen",
        "Gacheon University",
        "Fashion Design",
        "010-8628-1735",
        "https://github.com/ckd582"
        );
      const simpleCardInfo = await simpleCardNFTFactory.getSimpleCardInfo(
        await addr1.getAddress()
      );
      expect(simpleCardInfo.name).to.equal("Tina");
    });
  });

  describe("Minting and Transferring", () => {
    it("Should mint a new SimpleCardNFT", async () => {
      await simpleCardNFTFactory
        .connect(addr1)
        .registerSimpleCardInfo(
        "Robin",
        "robin582@careerzen.org",
        "Blockchain_Velly",
        "@Robin_Careerzen",
        "@Careerzen",
        "Careerzen",
        "Gacheon University",
        "Fashion Design",
        "010-8628-1735",
        "https://github.com/ckd582"
        );
      await simpleCardNFTFactory.connect(addr1).mintSimpleCardNFT();
      expect(
        await simpleCardNFTFactory.balanceOf(await addr1.getAddress())
      ).to.equal(1);
    });

    it("Should transfer a new SimpleCardNFT", async () => {
      await simpleCardNFTFactory
        .connect(addr1)
        .registerSimpleCardInfo(
        "Robin",
        "robin582@careerzen.org",
        "Blockchain_Velly",
        "@Robin_Careerzen",
        "@Careerzen",
        "Careerzen",
        "Gacheon University",
        "Fashion Design",
        "010-8628-1735",
        "https://github.com/ckd582"
        );
      await simpleCardNFTFactory
        .connect(addr1)
        .mintSimpleCardNFT({ value: ethers.utils.parseEther("0.01") });
      await simpleCardNFTFactory
        .connect(addr1)
        .transferSimpleCardNFT(await addr2.getAddress());

      expect(
        await simpleCardNFTFactory.balanceOf(await addr2.getAddress())
      ).to.equal(1);

      expect(
        await simpleCardNFTFactory.getAmountOfTokenOwnedByIssuer(
          await addr1.getAddress()
        )
      ).to.equal(0);
      expect(
        await simpleCardNFTFactory.balanceOf(await addr1.getAddress())
      ).to.equal(0);
    });
  });
});
