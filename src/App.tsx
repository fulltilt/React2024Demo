import React, { useEffect, useReducer } from "react";
import "./index.css";
import { getDogs } from "./dogapi";

export interface DogObject {
  title: string,
  url: string
}

interface Comment {
  text: string,
  votes: number
}

interface Comments {
  [key: string]: Comment[]
}

interface CarouselState {
  images: DogObject[],
  idx: number;
  comments: Comments,
  inputValue: string
}

type CarouselAction =
  | {
    type: 'INDEX',
    payload: number 
  } | {
    type: 'IMAGES',
    payload: DogObject[] 
  } | {
    type: 'INPUT',
    payload: string 
  } | {
    type: 'COMMENT',
    payload: Comments
  }

const reducer = (state: CarouselState, action: CarouselAction): CarouselState => {
  const { type, payload } = action
  switch (type) {
    case 'IMAGES': {
      return {
        ...state,
        images: payload
      }
    }
    case 'INDEX': {
      if (typeof payload !== 'number') return state
      let newIdx = state.idx + payload;
      if (newIdx < 0) newIdx = state.images.length - 1;
      if (newIdx === state.images.length) newIdx = 0;
      return {
        ...state,
        idx: newIdx
      }
    }
    case 'INPUT': {
      return {
        ...state,
        inputValue: payload
      }
    }
    case 'COMMENT': {
      return {
        ...state,
        comments: payload,
        inputValue: ''
      }
    }
    default:
      return state
  }
}

const initialState = {
  images: [],
  idx: 0,
  comments: {},
  inputValue: ''
}

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { images, idx, comments, inputValue } = state

  async function getImages() {
    let res = await getDogs();
    dispatch({ type: 'IMAGES', payload: res })
  }

  useEffect(() => {
    getImages();
  }, []);

  return (
    <section className="container">
      {state.images.length === 0 && <p>Loading...</p>}
      {state.images.length > 0 && <img alt={idx.toString()} src={images[idx].url} />}
      <div className="row">
        <button onClick={() => dispatch({ type: 'INDEX', payload: -1 })} className="prev">
          {"<<"}
        </button>
        <span className="title">{images.length > 0 && images[state.idx].title}</span>
        <button onClick={() => dispatch({ type: 'INDEX', payload: 1 })} className="prev">
          {">>"}
        </button>
      </div>
      <div className="input">
        <input
          value={inputValue}
          onChange={(e) => dispatch({ type: "INPUT", payload: e.target.value })}
          type="text"
        />
        <button
          onClick={() => {
            const newComment: Comment = {
              text: inputValue,
              votes: 0
            };

            let tempComments = Object.assign({}, comments);
            if (comments[idx])
              tempComments[idx] = tempComments[idx].concat([newComment]);
            else tempComments[idx] = [newComment];
            dispatch({ type: 'COMMENT', payload: tempComments })
          }}
        >
          Submit
        </button>
      </div>
      {/* <ul>
        {comments[idx] &&
          comments[idx].map((c, i) => (
            <li key={idx}>
              {c.text} | {c.votes}{" "}
              <button
                onClick={() => {
                  let tempComment = Object.assign({}, comments[idx]);
                  tempComment[i].votes++;
                  dispatch({ type: 'COMMENT', payload: { ...comments, ...tempComment[i] } })
                }}
              >
                Upvote
              </button>
            </li>
          ))}
      </ul> */}
    </section>
  );
}

export default App;
