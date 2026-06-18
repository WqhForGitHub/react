import { useState } from 'react';

interface Artwork {
  title: string;
  city: string;
  image: string;
}

interface Person {
  name: string;
  artwork: Artwork;
}

export default function NestedObjectDemo() {
  const [person, setPerson] = useState<Person>({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    },
  });

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPerson({
      ...person,
      name: e.target.value,
    });
  }

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        title: e.target.value,
      },
    });
  }

  function handleCityChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        city: e.target.value,
      },
    });
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        image: e.target.value,
      },
    });
  }

  return (
    <div className="form-demo">
      <p className="demo-hint">
        更新嵌套对象时，需要从更新的位置开始自底向上为每一层都创建新的拷贝。
      </p>
      <div className="form-fields">
        <label>
          Name:
          <input
            value={person.name}
            onChange={handleNameChange}
          />
        </label>
        <label>
          Title:
          <input
            value={person.artwork.title}
            onChange={handleTitleChange}
          />
        </label>
        <label>
          City:
          <input
            value={person.artwork.city}
            onChange={handleCityChange}
          />
        </label>
        <label>
          Image:
          <input
            value={person.artwork.image}
            onChange={handleImageChange}
          />
        </label>
      </div>
      <p className="person-info">
        <i>{person.artwork.title}</i>
        {' by '}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img
        className="artwork-image"
        src={person.artwork.image}
        alt={person.artwork.title}
      />
      <pre className="code-block">{`// 更新嵌套对象：需要逐层展开
setPerson({
  ...person,              // 复制 person
  artwork: {              // 替换 artwork
    ...person.artwork,    // 复制 artwork 中的字段
    city: e.target.value  // 覆盖 city
  }
});`}</pre>
    </div>
  );
}
