import React from 'react';
import { Link } from 'bisheng/router';


function getTime(date) {
  return (new Date(date)).getTime();
}

export default function (props) {
  const toReactComponent = props.utils.toReactComponent;
  const blog = props.picked.blog
    .sort((a, b) => getTime(b.meta.publishDate) - getTime(a.meta.publishDate));

  let year = NaN;
  const entryList = [];
  blog.forEach(({ meta, description }, index) => {
    if (!meta.publishDate) {
      console.error(`You must set 'publishDate' in meta data for ${meta.filename}.`);
      return;
    }
    const publishYear = meta.publishDate.slice(0, 4);
    if (year !== publishYear) {
      year = publishYear;
      entryList.push(
        <a className="item-year" href={`#${publishYear}`} key={publishYear} id={publishYear}>
          {publishYear}
        </a>);
    }

    entryList.push(
      <div className="item" key={index}>
        <h2 className="item-title" id={meta.title}>
          <time>{`${meta.publishDate.slice(0, 10)} `}</time>
          <Link to={`/${meta.filename.replace(/\.md$/i, '')}`}>{meta.title}</Link>
        </h2>
        {
          !description ? null :
            <div className="item-description">
              {toReactComponent(description)}
            </div>
        }
      </div>
    );
  })

  return entryList;
}

