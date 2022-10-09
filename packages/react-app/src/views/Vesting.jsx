import { Button, Card, DatePicker, Divider, Input, Progress, Slider, Spin, Switch } from "antd";
import React, { useState } from "react";
import { utils } from "ethers";
import { SyncOutlined } from "@ant-design/icons";

import { Address, Balance, Events } from "../components";

export default function Vesting({
  purpose,
  address,
  mainnetProvider,
  localProvider,
  yourLocalBalance,
  price,
  tx,
  readContracts,
  writeContracts,
}) {
  let contributors = [];
  let vestingFlow = [];
  let payrollFlow = [];

  const year = 31536000;
  const month = 24 * 3600 * 30;

  const [newMember, setNewMember] = useState("loading...");
  const [newVesting, setNewVesting] = useState("0");
  const [newPayroll, setNewPayroll] = useState("0");
  //  const [display,setDisplay] = useState(false);
  // const [members,setMembers] = useState([])
  //  const [test,setTest] = useState([]);

  const setNewContributor = () => {
    contributors.push(newMember);
    vestingFlow.push(utils.parseEther(newVesting).div(month));
    payrollFlow.push(utils.parseEther(newPayroll).div(month));
    console.log("CONTRIBUTORSSSS", vestingFlow);
    console.log("CONTRIBUTORSSSS", contributors);
    console.log("CONTRIBUTORSSSS", payrollFlow);
    // contributors.push(...members, newMember);
    // setMembers(contributors)
    // vestingFlow.push(utils.parseEther(newVesting).div(month));
    // payrollFlow.push(utils.parseEther(newPayroll).div(month));
    // console.log("CONTRIBUTORSSSS", vestingFlow);
    // console.log("CONTRIBUTORSSSS", contributors);
    // console.log("CONTRIBUTORSSSS", payrollFlow);
    // console.log("CONTRIBUTORS",members)

    //setDisplay(true);
  };

  const options = { gasLimit: 3000000 };

  return (
    <div>
      {/*
        ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
      */}
      <div
        style={{ border: "1px solid #cccccc", padding: 16, width: 800, margin: "auto", marginTop: 64, borderRadius: 7 }}
      >
        <h2>Vesting:</h2>
        <Divider />
        <div style={{ margin: 20 }}>
          <h3>Add Core Member</h3>
          <Input
            style={{
              marginTop: 8,
              marginLeft: 8,
              marginRight: 8,
              marginBottom: 8,
              padding: 8,
              borderRadius: 7,
              textAlign: "center",
            }}
            placeholder="Core Member address"
            onChange={e => {
              setNewMember(e.target.value);
            }}
          />
          <Input
            style={{
              marginTop: 8,
              marginLeft: 8,
              marginRight: 8,
              marginBottom: 8,
              padding: 8,
              borderRadius: 7,
              textAlign: "center",
            }}
            placeholder="Monthly vesting"
            onChange={e => {
              setNewVesting(e.target.value);
            }}
          />
          <Input
            style={{
              marginTop: 8,
              marginLeft: 8,
              marginRight: 8,
              marginBottom: 8,
              padding: 8,
              borderRadius: 7,
              textAlign: "center",
            }}
            placeholder="Monthly payroll"
            onChange={e => {
              setNewPayroll(e.target.value);
            }}
          />
          <Button
            type="primary"
            size="large"
            style={{ marginTop: 20, borderRadius: 7 }}
            onClick={() => setNewContributor()}
          >
            Add Core Member
          </Button>
          <Divider />

          <Button
            type="primary"
            size="large"
            style={{ marginTop: 8, marginLeft: 8, marginRight: 8, marginBottom: 8, borderRadius: 7 }}
            onClick={async () => {
              /* look how you call setPurpose on your contract: */
              /* notice how you pass a call back for tx updates too */
              const result = tx(
                writeContracts.Vesting.addCoreContributors(contributors, vestingFlow, payrollFlow, options),
                update => {
                  console.log("📡 Transaction Update:", update);
                  if (update && (update.status === "confirmed" || update.status === 1)) {
                    console.log(" 🍾 Transaction " + update.hash + " finished!");
                    console.log(
                      " ⛽️ " +
                        update.gasUsed +
                        "/" +
                        (update.gasLimit || update.gas) +
                        " @ " +
                        parseFloat(update.gasPrice) / 1000000000 +
                        " gwei",
                    );
                  }
                },
              );
              console.log("awaiting metamask/web3 confirm result...", result);
              console.log(await result);
            }}
          >
            Set Core Contributors
          </Button>
          <Button
            type="primary"
            size="large"
            style={{ marginTop: 8, marginLeft: 8, marginRight: 8, marginBottom: 8, borderRadius: 7 }}
            onClick={async () => {
              /* look how you call setPurpose on your contract: */
              /* notice how you pass a call back for tx updates too */
              const result = tx(writeContracts.Vesting.updateVesting(contributors, vestingFlow, options), update => {
                console.log("📡 Transaction Update:", update);
                if (update && (update.status === "confirmed" || update.status === 1)) {
                  console.log(" 🍾 Transaction " + update.hash + " finished!");
                  console.log(
                    " ⛽️ " +
                      update.gasUsed +
                      "/" +
                      (update.gasLimit || update.gas) +
                      " @ " +
                      parseFloat(update.gasPrice) / 1000000000 +
                      " gwei",
                  );
                }
              });
              console.log("awaiting metamask/web3 confirm result...", result);
              console.log(await result);
            }}
          >
            Update vesting
          </Button>
        </div>
      </div>
    </div>
  );
}
