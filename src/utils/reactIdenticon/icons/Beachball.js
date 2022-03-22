// Copyright 2017-2022 @polkadot/react-identicon authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback } from 'react';
import { beachballIcon } from '@polkadot/ui-shared';
import { jsx as _jsx } from "react/jsx-runtime";

function Identicon({
  address,
  className = '',
  size,
  style
}) {
  const updateElem = useCallback(node => {
    node && node.appendChild(beachballIcon(address, {
      isAlternative: false,
      size
    }));
  }, [address, size]);
  return /*#__PURE__*/_jsx("div", {
    className: className,
    ref: updateElem,
    style: style
  });
}

export const Beachball = /*#__PURE__*/React.memo(Identicon);