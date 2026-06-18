import { useState } from 'react';
import { initialTravelPlan, type TravelPlan } from '../data/places';

/**
 * 原则5：避免深度嵌套的 state
 * 使用扁平化的"表"结构代替嵌套的树状结构。
 * 删除一个地点只需：
 * 1. 更新父级的 childIds（排除已删除的 ID）
 * 2. 更新根级"表"对象
 */

interface PlaceTreeProps {
  id: number;
  parentId: number;
  placesById: TravelPlan;
  onComplete: (parentId: number, childId: number) => void;
}

function PlaceTree({ id, parentId, placesById, onComplete }: PlaceTreeProps) {
  const place = placesById[id];
  const childIds = place.childIds;

  return (
    <li>
      {place.title}
      <button
        onClick={() => onComplete(parentId, id)}
        style={{ marginLeft: '8px', fontSize: '12px' }}
      >
        完成
      </button>
      {childIds.length > 0 && (
        <ol>
          {childIds.map((childId) => (
            <PlaceTree
              key={childId}
              id={childId}
              parentId={id}
              placesById={placesById}
              onComplete={onComplete}
            />
          ))}
        </ol>
      )}
    </li>
  );
}

export default function TravelPlan() {
  const [plan, setPlan] = useState(initialTravelPlan);

  function handleComplete(parentId: number, childId: number) {
    const parent = plan[parentId];
    // 创建父级地点的新版本，排除已删除的子级 ID
    const nextParent = {
      ...parent,
      childIds: parent.childIds.filter((id) => id !== childId),
    };
    // 更新根 state 对象，包含更新后的父级
    setPlan({
      ...plan,
      [parentId]: nextParent,
    });
  }

  const root = plan[0];
  const planetIds = root.childIds;

  return (
    <>
      <h2>要参观的地方</h2>
      <ol>
        {planetIds.map((id) => (
          <PlaceTree
            key={id}
            id={id}
            parentId={0}
            placesById={plan}
            onComplete={handleComplete}
          />
        ))}
      </ol>
    </>
  );
}
