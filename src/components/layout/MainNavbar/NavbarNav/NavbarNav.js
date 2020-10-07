import React from "react";
import { Nav } from "shards-react";

import Notifications from "./Notifications";
import UserActions from "./UserActions";

export default () => (
  <Nav navbar className="border-left flex-row" style={{ "justify-content": "flex-end" }}>
    <Notifications />
    <UserActions />
  </Nav>
);
