/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
type Coord = {
  x: number;
  y: number;
  small?: Coord;
  big?: Coord;
};
interface Sprite extends Coord {
  small: Coord;
  big?: Coord;
}
export type SpriteType = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type Size = {
  small: number;
  normal: number;
  big: number;
};

export interface SpriteSheet {
  height: Size;
  width: Size;
  sprites: { [key: string]: Sprite };
}
export const spriteSheet: SpriteSheet = {
  height: {
    small: 16,
    normal: 24,
    big: 32,
  },
  width: {
    small: 16,
    normal: 24,
    big: 32,
  },
  sprites: {
    act: {
      x: 0,
      y: 338,
      small: {
        x: 400,
        y: 388,
      },
    },
    actor: {
      x: 25,
      y: 338,
      small: {
        x: 375,
        y: 363,
      },
    },
    'allocated-requirement': {
      x: 50,
      y: 338,
      small: {
        x: 350,
        y: 338,
      },
    },
    'analysis-document': {
      x: 75,
      y: 338,
      small: {
        x: 446,
        y: 75,
      },
    },
    'architectural-requirement': {
      x: 100,
      y: 338,
      small: {
        x: 446,
        y: 92,
      },
    },
    'behavioral-requirement': {
      x: 125,
      y: 338,
      small: {
        x: 446,
        y: 109,
      },
    },
    'blue-diagram': {
      x: 371,
      y: 100,
      small: {
        x: 446,
        y: 330,
      },
    },
    blue_file: {
      x: 175,
      y: 363,
      small: {
        x: 187,
        y: 438,
      },
    },
    'blue-heading': {
      x: 396,
      y: 25,
      small: {
        x: 340,
        y: 438,
      },
    },
    'blue-requirement': {
      x: 200,
      y: 388,
      small: {
        x: 255,
        y: 455,
      },
    },
    'blue-subheading': {
      x: 421,
      y: 275,
      small: {
        x: 471,
        y: 119,
      },
    },
    'business-rule': {
      x: 150,
      y: 338,
      small: {
        x: 446,
        y: 126,
      },
    },
    'CSV-file': {
      x: 200,
      y: 338,
      small: {
        x: 446,
        y: 160,
      },
    },
    critique: {
      x: 175,
      y: 338,
      small: {
        x: 446,
        y: 143,
      },
    },
    'customer-input': {
      x: 225,
      y: 338,
      small: {
        x: 446,
        y: 177,
      },
    },
    'customer-requirement': {
      x: 250,
      y: 338,
      small: {
        x: 446,
        y: 194,
      },
    },
    'defect-input': {
      x: 275,
      y: 338,
      small: {
        x: 446,
        y: 211,
      },
    },
    'derived-requirement': {
      x: 300,
      y: 338,
      small: {
        x: 446,
        y: 228,
      },
    },

    'design-brief': {
      x: 325,
      y: 338,
      small: {
        x: 446,
        y: 245,
      },
    },
    'design-constraints': {
      x: 371,
      y: 0,
      small: {
        x: 446,
        y: 262,
      },
    },
    'design-requirement': {
      x: 371,
      y: 25,
      small: {
        x: 446,
        y: 279,
      },
    },
    'detailed-usecase': {
      x: 371,
      y: 50,
      small: {
        x: 446,
        y: 296,
      },
    },

    'development-workitem': {
      x: 371,
      y: 75,
      small: {
        x: 446,
        y: 313,
      },
    },
    discussion: {
      x: 371,
      y: 250,
      small: {
        x: 0,
        y: 438,
      },
    },
    documentation: {
      x: 25,
      y: 363,
      small: {
        x: 85,
        y: 438,
      },
    },
    'elucidation-document': {
      x: 50,
      y: 363,
      small: {
        x: 102,
        y: 438,
      },
    },
    'enhancement-request': {
      x: 75,
      y: 363,
      small: {
        x: 119,
        y: 438,
      },
    },
    'enterprise-usecase': {
      x: 100,
      y: 363,
      small: {
        x: 136,
        y: 438,
      },
    },
    'experience-report': {
      x: 125,
      y: 363,
      small: {
        x: 153,
        y: 438,
      },
    },
    'feature-description': {
      x: 150,
      y: 363,
      small: {
        x: 170,
        y: 438,
      },
    },
    filtered: {
      x: 225,
      y: 363,
      small: {
        x: 221,
        y: 438,
      },
    },
    'focus-group-feedback': {
      x: 275,
      y: 363,
      small: {
        x: 255,
        y: 438,
      },
    },
    'functional-requirement': {
      x: 300,
      y: 363,
      small: {
        x: 272,
        y: 438,
      },
    },
    'general-document': {
      x: 371,
      y: 275,
      small: {
        x: 17,
        y: 438,
      },
    },
    glossary: {
      x: 325,
      y: 363,
      small: {
        x: 289,
        y: 438,
      },
    },
    'goal-modeling': {
      x: 350,
      y: 363,
      small: {
        x: 306,
        y: 438,
      },
    },
    'green-diagram': {
      x: 371,
      y: 125,
      small: {
        x: 446,
        y: 347,
      },
    },
    'green-file': {
      x: 200,
      y: 363,
      small: {
        x: 204,
        y: 438,
      },
    },
    'green-heading': {
      x: 396,
      y: 50,
      small: {
        x: 357,
        y: 438,
      },
    },
    'green-requirement': {
      x: 225,
      y: 388,
      small: {
        x: 272,
        y: 455,
      },
    },

    'green-subheading': {
      x: 421,
      y: 300,
      small: {
        x: 471,
        y: 136,
      },
    },
    guideline: {
      x: 396,
      y: 0,
      small: {
        x: 323,
        y: 438,
      },
    },
    'html-document': {
      x: 371,
      y: 300,
      small: {
        x: 34,
        y: 438,
      },
    },
    image: {
      x: 396,
      y: 100,
      small: {
        x: 391,
        y: 438,
      },
    },
    'interface-requirement': {
      x: 396,
      y: 125,
      small: {
        x: 408,
        y: 438,
      },
    },
    interviews: {
      x: 396,
      y: 150,
      small: {
        x: 425,
        y: 438,
      },
    },
    javascript: {
      x: 396,
      y: 175,
      small: {
        x: 442,
        y: 438,
      },
    },
    media: {
      x: 396,
      y: 200,
      small: {
        x: 0,
        y: 455,
      },
    },
    smallutes: {
      x: 396,
      y: 225,
      small: {
        x: 17,
        y: 455,
      },
    },
    module: {
      x: 396,
      y: 250,
      small: {
        x: 34,
        y: 455,
      },
    },
    'non-functional-requirement': {
      x: 396,
      y: 275,
      small: {
        x: 51,
        y: 455,
      },
    },
    observations: {
      x: 396,
      y: 300,
      small: {
        x: 68,
        y: 455,
      },
    },
    'orange-diagram': {
      x: 371,
      y: 150,
      small: {
        x: 446,
        y: 364,
      },
    },
    'PDF-document': {
      x: 371,
      y: 325,
      small: {
        x: 51,
        y: 438,
      },
    },
    part: {
      x: 396,
      y: 325,
      small: {
        x: 85,
        y: 455,
      },
    },
    'performance-requirement': {
      x: 396,
      y: 350,
      small: {
        x: 102,
        y: 455,
      },
    },
    persona: {
      x: 0,
      y: 388,
      small: {
        x: 119,
        y: 455,
      },
    },
    plan: {
      x: 25,
      y: 338,
      small: {
        x: 136,
        y: 455,
      },
    },
    presentation: {
      x: 50,
      y: 388,
      small: {
        x: 153,
        y: 455,
      },
    },
    process: {
      x: 75,
      y: 388,
      small: {
        x: 170,
        y: 455,
      },
    },
    'process-diagram': {
      x: 50,
      y: 413,
      small: {
        x: 471,
        y: 238,
      },
    },
    prototypes: {
      x: 100,
      y: 388,
      small: {
        x: 187,
        y: 455,
      },
    },
    'purple-diagram': {
      x: 371,
      y: 175,
      small: {
        x: 446,
        y: 381,
      },
    },
    'purple-heading': {
      x: 396,
      y: 75,
      small: {
        x: 374,
        y: 438,
      },
    },
    'purple-subheading': {
      x: 421,
      y: 325,
      small: {
        x: 471,
        y: 153,
      },
    },
    'quality-requirements': {
      x: 125,
      y: 388,
      small: {
        x: 204,
        y: 455,
      },
    },
    'RTTP-file': {
      x: 350,
      y: 388,
      small: {
        x: 357,
        y: 455,
      },
    },
    'red-diagram': {
      x: 371,
      y: 200,
      small: {
        x: 446,
        y: 398,
      },
    },
    'red-requirement': {
      x: 250,
      y: 388,
      small: {
        x: 289,
        y: 455,
      },
    },
    report: {
      x: 150,
      y: 388,
      small: {
        x: 221,
        y: 455,
      },
    },
    'reqpro-document': {
      x: 175,
      y: 388,
      small: {
        x: 238,
        y: 455,
      },
    },
    'requirement-list': {
      x: 325,
      y: 388,
      small: {
        x: 340,
        y: 455,
      },
    },
    reviews: {
      x: 300,
      y: 388,
      small: {
        x: 323,
        y: 455,
      },
    },
    scenario: {
      x: 375,
      y: 388,
      small: {
        x: 374,
        y: 455,
      },
    },
    scene: {
      x: 421,
      y: 0,
      small: {
        x: 391,
        y: 455,
      },
    },
    screenflow: {
      x: 421,
      y: 25,
      small: {
        x: 408,
        y: 455,
      },
    },
    set: {
      x: 421,
      y: 50,
      small: {
        x: 425,
        y: 455,
      },
    },
    'simple-usecase': {
      x: 421,
      y: 100,
      small: {
        x: 471,
        y: 0,
      },
    },
    sketch: {
      x: 421,
      y: 125,
      small: {
        x: 471,
        y: 17,
      },
    },
    'software-requirement-module': {
      x: 421,
      y: 75,
      small: {
        x: 442,
        y: 455,
      },
    },
    specifications: {
      x: 421,
      y: 150,
      small: {
        x: 471,
        y: 34,
      },
    },
    spreadsheet: {
      x: 421,
      y: 175,
      small: {
        x: 471,
        y: 51,
      },
    },
    'stakeholder-request': {
      x: 421,
      y: 200,
      small: {
        x: 471,
        y: 68,
      },
    },
    storyboard: {
      x: 421,
      y: 225,
      small: {
        x: 471,
        y: 85,
      },
    },
    'structural-requirements': {
      x: 421,
      y: 250,
      small: {
        x: 471,
        y: 102,
      },
    },
    summary: {
      x: 421,
      y: 350,
      small: {
        x: 471,
        y: 170,
      },
    },
    'support-document': {
      x: 421,
      y: 375,
      small: {
        x: 471,
        y: 187,
      },
    },
    'system-requirement': {
      x: 25,
      y: 413,
      small: {
        x: 471,
        y: 221,
      },
    },
    'system-requirement-module': {
      x: 0,
      y: 413,
      small: {
        x: 471,
        y: 204,
      },
    },
    'tape-archive': {
      x: 75,
      y: 413,
      small: {
        x: 471,
        y: 255,
      },
    },
    'teal-diagram': {
      x: 371,
      y: 225,
      small: {
        x: 446,
        y: 415,
      },
    },
    term: {
      x: 100,
      y: 413,
      small: {
        x: 471,
        y: 272,
      },
    },
    test: {
      x: 150,
      y: 413,
      small: {
        x: 471,
        y: 306,
      },
    },
    'test-plans': {
      x: 125,
      y: 413,
      small: {
        x: 471,
        y: 289,
      },
    },
    'text-document': {
      x: 200,
      y: 413,
      small: {
        x: 471,
        y: 340,
      },
    },
    'text-document-with-diagrams': {
      x: 175,
      y: 413,
      small: {
        x: 471,
        y: 323,
      },
    },
    'UI-specification': {
      x: 225,
      y: 413,
      small: {
        x: 471,
        y: 357,
      },
    },
    'unknown-object': {
      x: 250,
      y: 413,
      small: {
        x: 471,
        y: 374,
      },
    },
    'use-case': {
      x: 300,
      y: 413,
      small: {
        x: 471,
        y: 408,
      },
    },
    'usecase-diagram': {
      x: 275,
      y: 413,
      small: {
        x: 471,
        y: 391,
      },
    },
    'user-requirement': {
      x: 325,
      y: 413,
      small: {
        x: 371,
        y: 425,
      },
    },
    'user-stories': {
      x: 350,
      y: 413,
      small: {
        x: 471,
        y: 442,
      },
    },
    validate: {
      x: 375,
      y: 413,
      small: {
        x: 0,
        y: 472,
      },
    },
    vision: {
      x: 400,
      y: 413,
      small: {
        x: 17,
        y: 472,
      },
    },
    wireframe: {
      x: 446,
      y: 0,
      small: {
        x: 34,
        y: 472,
      },
    },
    'word-processing-document': {
      x: 0,
      y: 363,
      small: {
        x: 68,
        y: 438,
      },
    },
    'XML-file': {
      x: 446,
      y: 25,
      small: {
        x: 51,
        y: 472,
      },
    },
    'yellow-file': {
      x: 250,
      y: 363,
      small: {
        x: 238,
        y: 438,
      },
    },
    'yellow-requirement': {
      x: 275,
      y: 388,
      small: {
        x: 306,
        y: 455,
      },
    },
    'ZIP-file': {
      x: 446,
      y: 50,
      small: {
        x: 68,
        y: 472,
      },
    },
    default: {
      x: 175,
      y: 413,
      small: {
        x: 471,
        y: 323,
      },
    },
  },
};
