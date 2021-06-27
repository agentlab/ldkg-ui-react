/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { isArray } from 'lodash-es';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'antd';

import { spriteSheet } from './iconsGreed';
interface SpriteProps {
  filename: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export const Sprite: React.FC<SpriteProps> = ({ filename, x = 0, y = 0, width = 0, height = 0 }: SpriteProps) => {
  if (!filename) {
    return null;
  }
  const style: React.CSSProperties = {
    backgroundImage: `url(${filename})`,
    backgroundPosition: `${x * -1}px ${y * -1}px`,
    backgroundRepeat: 'no-repeat',
    width,
    height,
  };
  return <div style={style} />;
};

export const base = ({ value }: any) => <div style={{ margin: '6px' }}>{value}</div>;

export const integer = ({ value }: any) => value.toString();

export const identifier = ({ value }: any) => (
  <Link to={`/artifacts/${value}`}>{value.toString().padStart(5, '0')}</Link>
);

export const image = ({ value }: any) => (
  <div style={{ height: 60, float: 'left', paddingRight: '3px', overflow: 'hidden' }}>
    <Image
      style={{ height: 60, maxWidth: 60, width: 'auto' }}
      src={isArray(value) ? (value.length > 0 ? value[0] : '') : value}
    />
  </div>
);

export const artifactTitle = ({ value, type }: any) => {
  const SpriteObj: any = {
    'rmUserTypes:_YwcOsRmREemK5LEaKhoOow_Module': 'allocated-requirement',
    'rmUserTypes:_YwcOsRmREemK5LEaKhoOow_Text': 'analysis-document',
    'rmUserTypes:_YwcOsRmREemK5LEaKhoOow_Collection': 'behavioral-requirement',
  };
  return (
    <div style={{ display: 'flex' }}>
      {type && (
        <div style={{ display: 'inline-block', padding: '3px 5px 0 0' }}>
          <Sprite
            filename={process.env.PUBLIC_URL + '/img/rm-artifact-icons-sprite.png'}
            x={spriteSheet.sprites[SpriteObj[type]].x}
            y={spriteSheet.sprites[SpriteObj[type]].y}
            width={spriteSheet.width.normal}
            height={spriteSheet.width.normal}
          />
        </div>
      )}
      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{value}</div>
    </div>
  );
};

export const dateTime = ({ value }: any) => <span>{moment(value).subtract(10, 'days').calendar()}</span>;

export const link = ({ value, link }: any) => <a href={link ? link : value}>{value ? value : link}</a>;
