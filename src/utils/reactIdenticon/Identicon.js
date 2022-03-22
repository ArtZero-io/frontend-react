// Copyright 2017-2022 @polkadot/react-identicon authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import styled from 'styled-components';
import { ICON_DEFAULT_HOST, settings } from '@polkadot/ui-settings';
import { isHex, isU8a, u8aToHex } from '@polkadot/util';
import { decodeAddress, encodeAddress, ethereumEncode } from '@polkadot/util-crypto';
import { Beachball, Empty, Ethereum, Jdenticon, Polkadot } from "./icons/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
const Fallback = Beachball;
const DEFAULT_SIZE = 128;
const Components = {
  beachball: Beachball,
  empty: Empty,
  ethereum: Ethereum,
  jdenticon: Jdenticon,
  polkadot: Polkadot,
  substrate: Jdenticon
};
const Wrapper = styled.div.withConfig({
  displayName: "Identicon__Wrapper",
  componentId: "sc-1gm2vek-0"
})(["display:inline-block;line-height:0;> .container{position:relative;> div,> svg{position:relative;}&.highlight:before{position:absolute;top:0;left:0;right:0;bottom:0;border-radius:50%;box-shadow:0 0 5px 2px #aaa;content:'';}}"]);

class BaseIcon extends React.PureComponent {
  state = {
    address: '',
    publicKey: '0x'
  };
  static prefix = undefined;

  static setDefaultPrefix(prefix) {
    BaseIcon.prefix = prefix;
  }

  static getDerivedStateFromProps({
    prefix = BaseIcon.prefix,
    theme,
    value
  }, prevState) {
    if (theme === 'ethereum') {
      const address = isU8a(value) ? ethereumEncode(value) : value || '';
      return {
        address,
        publicKey: ''
      };
    }

    try {
      const address = isU8a(value) || isHex(value) ? encodeAddress(value, prefix) : value || '';
      const publicKey = u8aToHex(decodeAddress(address, false, prefix));
      return address === prevState.address ? null : {
        address,
        publicKey
      };
    } catch (error) {
      return {
        address: '',
        publicKey: '0x'
      };
    }
  }

  render() {
    const {
      address
    } = this.state;
    const wrapped = this.getWrapped(this.state, this.props);
    return !address ? wrapped : /*#__PURE__*/_jsx(CopyToClipboard, {
      onCopy: this.onCopy,
      text: address,
      children: wrapped
    });
  }

  getWrapped({
    address,
    publicKey
  }, {
    Custom
  }) {
    const {
      className = '',
      isAlternative,
      isHighlight,
      size = DEFAULT_SIZE,
      style,
      theme = settings.icon
    } = this.props;
    const Component = !address ? Empty : Custom || Components[theme === 'default' ? ICON_DEFAULT_HOST : theme] || Fallback;
    return /*#__PURE__*/_jsx(Wrapper, {
      className: `ui--IdentityIcon  ${className}`,
      style: style,
      children: /*#__PURE__*/_jsx(Component, {
        address: address,
        className: isHighlight ? 'highlight' : '',
        isAlternative: isAlternative,
        publicKey: publicKey,
        size: size
      })
    }, address);
  }

  onCopy = () => {
    const {
      onCopy
    } = this.props;
    const {
      address
    } = this.state;

    if (address && onCopy) {
      onCopy(address);
    }
  };
}

function Icon(props) {
  return /*#__PURE__*/_jsx(BaseIcon, { ...props
  });
}

export const Identicon = /*#__PURE__*/React.memo(Icon);