import { Button, Card, DatePicker, Divider, Input, Progress, Slider, Spin, Switch, List, Form } from "antd";
import React, { useState } from "react";
import { utils } from "ethers";
import { SyncOutlined } from "@ant-design/icons";

import { Address, Balance, Events } from "../components";

export default function Payroll({
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
  let test = [];
  const year = 31536000;
  const month = 24 * 3600 * 30;
  const [newPurpose, setNewPurpose] = useState("loading...");
  const [newMember, setNewMember] = useState("loading...");
  // const [newVesting, setNewVesting] = useState("0");
  const [newPayroll, setNewPayroll] = useState("0");
  const setNewContributor = () => {
    contributors.push(newMember);
    //    vestingFlow.push(utils.parseEther(newVesting).div(month))
    payrollFlow.push(utils.parseEther(newPayroll).div(month));
    console.log("CONTRIBUTORSSSS", vestingFlow);
    console.log("CONTRIBUTORSSSS", contributors);
    console.log("CONTRIBUTORSSSS", payrollFlow);
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
        <h2>Payroll managing</h2>

        <Divider />
        <div style={{ margin: 20 }}>
          <h3>Add Member</h3>
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
            placeholder="Member address"
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
            Add Member
          </Button>
          <Divider />
          <List>
            {contributors
              ? contributors.map(openedFlow => <Form.Item key={openedFlow} flow={openedFlow} />)
              : "LOADING"}
          </List>
          {/* <h4>Contributors: {contributors}</h4> */}
          <Button
            type="primary"
            size="large"
            style={{ marginTop: 8, marginLeft: 8, marginRight: 8, marginBottom: 8, borderRadius: 7 }}
            onClick={async () => {
              const result = tx(writeContracts.Vesting.addPayrolls(contributors, payrollFlow, options), update => {
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
            Add Payroll
          </Button>

          <Button
            type="primary"
            size="large"
            style={{ marginTop: 8, marginLeft: 8, marginRight: 8, marginBottom: 8, borderRadius: 7 }}
            onClick={async () => {
              const result = tx(writeContracts.Vesting.updatePayrolls(contributors, payrollFlow, options), update => {
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
            Update Payroll
          </Button>
        </div>
        <Divider />
      </div>
    </div>
  );
}
