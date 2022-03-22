// Copyright 2017-2022 @polkadot/react-identicon authors & contributors
// SPDX-License-Identifier: Apache-2.0
import * as jdenticon from 'jdenticon';
import React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";

function Identicon({
  className = '',
  publicKey,
  size,
  style
}) {
  return /*#__PURE__*/_jsx("div", {
    className: className,
    dangerouslySetInnerHTML: {
      __html: jdenticon.toSvg(publicKey.substr(2), size)
    },
    style: style
  });
}

export const Jdenticon = /*#__PURE__*/React.memo(Identicon);