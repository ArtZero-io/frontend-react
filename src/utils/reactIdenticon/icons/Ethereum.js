// Copyright 2017-2022 @polkadot/react-identicon authors & contributors
// SPDX-License-Identifier: Apache-2.0
import makeBlockie from 'ethereum-blockies-base64';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";

function Identicon({
  address,
  className = '',
  style
}) {
  const imgSrc = useMemo(() => makeBlockie(address), [address]);
  return /*#__PURE__*/_jsx("img", {
    className: className,
    src: imgSrc,
    style: style
  });
}

export const Ethereum = /*#__PURE__*/React.memo(styled(Identicon).withConfig({
  displayName: "Ethereum",
  componentId: "sc-osop9v-0"
})(({
  size
}) => `
  display: block;
  height: ${size}px;
  width: ${size}px;
`));