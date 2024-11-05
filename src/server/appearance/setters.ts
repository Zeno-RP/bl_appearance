import { TAppearance, TClothes, TSkin } from '@typings/appearance';
import { getFrameworkID, onClientCallback, } from '../utils';
import { oxmysql } from '@overextended/oxmysql';
import { TTattoo } from '@typings/tattoos';

export async function saveSkin(src: number, frameworkId: string, skin: TSkin) {
    if (!frameworkId) {
        frameworkId = getFrameworkID(src);
    }

    const result = await oxmysql.update(
        'UPDATE appearance SET skin = ? WHERE id = ?',
        [JSON.stringify(skin), frameworkId]
    );
    return result;
}
onClientCallback('bl_appearance:server:saveSkin', saveSkin);
exports('SavePlayerSkin', function(id, skin) {
    return saveSkin(null, id, skin)
});

export async function saveClothes(src: number, frameworkId: string, clothes: TClothes) {
    if (!frameworkId) {
        frameworkId = getFrameworkID(src);
    }
    
    const result = await oxmysql.update(
        'UPDATE appearance SET clothes = ? WHERE id = ?',
        [JSON.stringify(clothes), frameworkId]
    );
    return result;
}
onClientCallback('bl_appearance:server:saveClothes', saveClothes);
exports('SavePlayerClothes', function(id, clothes) {
    return saveClothes(null, id, clothes)
});

export async function saveTattoos(src: number, frameworkId: string, tattoos: TTattoo[]) {
    if (!frameworkId) {
        frameworkId = getFrameworkID(src);
    }
    
    const result = await oxmysql.update(
        'UPDATE appearance SET tattoos = ? WHERE id = ?',
        [JSON.stringify(tattoos), frameworkId]
    );
    return result;
}
onClientCallback('bl_appearance:server:saveTattoos', saveTattoos);
exports('SavePlayerTattoos', function(id, tattoos) {
    return saveTattoos(null, id, tattoos)
});


export async function saveAppearance(src: number, frameworkId: string, appearance: TAppearance, force?: boolean) {
  if (!force && src && frameworkId && getFrameworkID(src) !== frameworkId) console.warn('You are trying to save an appearance for a different player', src, frameworkId);
	if (!frameworkId) frameworkId = getFrameworkID(src);

  const queries = [];

  queries.push([
    `DELETE FROM user_character_components WHERE user_character_components.character_id = ?;`,
    [
      frameworkId,
    ]
  ]);

  let mapper: any = {
    'face': 0,
    'masks': 1,
    'hair': 2,
    'torsos': 3,
    'legs': 4,
    'bags': 5,
    'shoes': 6,
    'neck': 7,
    'shirts': 8,
    'vest': 9,
    'decals': 10,
    'jackets': 11,
  };

  Object.keys(appearance.drawables).forEach(key => {
    const data = appearance.drawables[key];
    queries.push([
      `
        INSERT INTO user_character_components (
          type,
          component_id,
          texture,
          drawable,
          character_id
        ) VALUES (?, ?, ?, ?, ?);
      `,
      [
        'components',
        mapper[data.id],
        data.texture,
        data.value,
        frameworkId,
      ]
    ]);
  });

  mapper = {
    'hats': 0,
    'glasses': 1,
    'earrings': 2,
    'mouth': 3,
    'lhand': 4,
    'rhand': 5,
    'watches': 6,
    'bracelets': 7,
  };

  Object.keys(appearance.props).forEach(key => {
    const data = appearance.props[key]

    queries.push([
      `
        INSERT INTO user_character_components (
          type,
          component_id,
          texture,
          drawable,
          character_id
        ) VALUES (?, ?, ?, ?, ?);
      `,
      [
          'props',
          mapper[data.id],
          data.texture,
          data.value,
          frameworkId,
      ] 
    ]);
  });

  mapper = {
    'Blemishes': 'blemishes',
    'FacialHair': 'beard',
    'Eyebrows': 'eyebrows',
    'Ageing': 'ageing',
    'Makeup': 'makeUp',
    'Blush': 'blush',
    'Complexion': 'complexion',
    'SunDamage': 'sunDamage',
    'Lipstick': 'lipstick',
    'MolesFreckles': 'molesAndFreckles',
    'ChestHair': 'chestHair',
    'BodyBlemishes': 'bodyBlemishes',
    'AddBodyBlemishes': 'extraBodyBlemishes',
    'EyeColor': 'eyeColor',
  };

  queries.push([
    `DELETE FROM user_character_overlays WHERE user_character_overlays.character_id = ?;`,
    [
      frameworkId,
    ]
  ]);

  Object.keys(appearance.headOverlay).forEach(key => {
    const data = appearance.headOverlay[key]

    queries.push([
      `
        INSERT INTO user_character_overlays (
          name,
          style,
          opacity,
          second_color,
          color,
          character_id
        ) VALUES (?, ?, ?, ?, ?, ?);
      `,
      [
        mapper[key],
        data.colourType || 0,
        data.overlayValue,
        data.secondColor || 0,
        data.firstColor || 0,
        frameworkId,
      ]
    ]);
  });
  
  queries.push([
    `DELETE FROM user_character_features WHERE user_character_features.character_id = ?;`,
    [
      frameworkId,
    ]
  ]);

  Object.keys(appearance.headBlend).forEach(key => {
    queries.push([
`
        INSERT INTO user_character_features (
          type,
          name,
          value,
          character_id
        ) VALUES (?, ?, ?, ?);
      `,
      [
        'headBlend',
        key,
        appearance.headBlend[key],
        frameworkId,
      ]
    ]);
  });

  mapper = {
    'noseWidth': 'Nose_Width',
    'nosePeakHigh': 'Nose_Peak_Height',
    'nosePeakLowering': 'Nose_Peak_Lenght',
    'noseBoneHigh': 'Nose_Bone_Height',
    'nosePeakSize': 'Nose_Peak_Lowering',
    'noseBoneTwist': 'Nose_Bone_Twist',
    'eyeBrownHigh': 'EyeBrown_Height',
    'eyeBrownForward': 'EyeBrown_Forward',
    'cheeksBoneHigh': 'Cheeks_Bone_High',
    'cheeksBoneWidth': 'Cheeks_Bone_Width',
    'cheeksWidth': 'Cheeks_Width',
    'eyesOpening': 'Eyes_Openning',
    'lipsThickness': 'Lips_Thickness',
    'jawBoneWidth': 'Jaw_Bone_Width',
    'jawBoneBackSize': 'Jaw_Bone_Back_Lenght',
    'chinBoneLowering': 'Chin_Bone_Lowering',
    'chinBoneLenght': 'Chin_Bone_Length',
    'chinBoneWidth': 'Chin_Bone_Width',
    'chinHole': 'Chin_Hole',
    'neckThickness': 'Neck_Thikness',
  };

  Object.keys(appearance.headStructure).forEach(key => {
    const data = appearance.headStructure[key]
    queries.push([
      `
        INSERT INTO user_character_features (
          type,
          name,
          value,
          character_id
        ) VALUES (?, ?, ?, ?);
      `,
      [
        'faceFeatures',
        mapper[data.id],
        data.value,
        frameworkId,
      ]
    ]);
  });

  queries.push([
    `
      UPDATE user_character SET
      user_character.model = ?,
      user_character.hair_color = ?,
      user_character.hair_highlight = ?
      WHERE id = ?;
    `,
    [
      appearance.model,
      appearance.hairColor.color,
      appearance.hairColor.highlight,
      frameworkId,
    ]
  ]);

//   }

  const success = await oxmysql.transaction(queries)

	// const tattoos = appearance.tattoos || [];

	// const result = await oxmysql.prepare(
	// 	'INSERT INTO appearance (id, clothes, skin, tattoos) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE clothes = VALUES(clothes), skin = VALUES(skin), tattoos = VALUES(tattoos);',
	// 	[
	// 		frameworkId,
	// 		JSON.stringify(clothes), // done
	// 		JSON.stringify(skin), // done
	// 		JSON.stringify(tattoos),
	// 	]
	// );

	return success;
}
onClientCallback('bl_appearance:server:saveAppearance', saveAppearance);
exports('SavePlayerAppearance', function(id, appearance) {
    return saveAppearance(null, id, appearance)
});
