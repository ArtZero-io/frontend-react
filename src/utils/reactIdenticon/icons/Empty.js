// Copyright 2017-2022 @polkadot/react-identicon authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";

function Identicon({
  className = '',
  size,
  style
}) {
  return /*#__PURE__*/_jsx("svg", {
    className: className,
    height: size,
    style: style,
    viewBox: "0 0 64 64",
    width: size
  });
}

export const Empty = /*#__PURE__*/React.memo(Identicon);