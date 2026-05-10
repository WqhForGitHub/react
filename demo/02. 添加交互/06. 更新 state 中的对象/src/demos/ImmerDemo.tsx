import { useImmer } from 'use-immer';

interface Artwork {
  title: string;
  city: string;
  image: string;
}

interface Person {
  name: string;
  artwork: Artwork;
}

export default function ImmerDemo() {
  const [person, updatePerson] = useImmer<Person>({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    },
  });

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    updatePerson((draft) => {
      draft.name = e.target.value;
    });
  }

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    updatePerson((draft) => {
      draft.artwork.title = e.target.value;
    });
  }

  function handleCityChange(e: React.ChangeEvent<HTMLInputElement>) {
    updatePerson((draft) => {
      draft.artwork.city = e.target.value;
    });
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    updatePerson((draft) => {
      draft.artwork.image = e.target.value;
    });
  }

  return (
    <div className="form-demo">
      <p className="demo-hint">
        使用 <code>use-immer</code>，你可以像直接修改对象一样编写代码，Immer 会帮你处理好复制的过程。
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
      <pre className="code-block">{`// 使用 Immer：直接修改 draft 即可
updatePerson(draft => {
  draft.artwork.city = e.target.value;
});`}</pre>
    </div>
  );
}
