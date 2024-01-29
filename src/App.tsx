import React, { useEffect, useReducer, useCallback } from "react";
import "./index.css";
import { useFetchImagesQuery } from "./store";

export interface DogObject {
  title: string;
  url: string;
}

interface Comment {
  text: string;
  votes: number;
}

interface Comments {
  [key: string]: Comment[];
}

interface CarouselState {
  images: DogObject[];
  idx: number;
  comments: Comments;
  inputValue: string;
}

type CarouselAction =
  | {
      type: "INDEX";
      payload: number;
    }
  | {
      type: "IMAGES";
      payload: DogObject[];
    }
  | {
      type: "INPUT";
      payload: string;
    }
  | {
      type: "COMMENT";
      payload: Comments;
    };

const reducer = (
  state: CarouselState,
  action: CarouselAction
): CarouselState => {
  const { type, payload } = action;
  switch (type) {
    case "IMAGES": {
      return {
        ...state,
        images: payload,
      };
    }
    case "INDEX": {
      if (typeof payload !== "number") return state;
      let newIdx = state.idx + payload;
      if (newIdx < 0) newIdx = state.images.length - 1;
      if (newIdx === state.images.length) newIdx = 0;
      return {
        ...state,
        idx: newIdx,
      };
    }
    case "INPUT": {
      return {
        ...state,
        inputValue: payload,
      };
    }
    case "COMMENT": {
      return {
        ...state,
        comments: payload,
        inputValue: "",
      };
    }
    default:
      return state;
  }
};

const initialState = {
  images: [],
  idx: 0,
  comments: {},
  inputValue: "",
};

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { images, idx, comments, inputValue } = state;

  const { data, isLoading } = useFetchImagesQuery();

  const getImages = useCallback(async () => {
    const dogs: DogObject[] = [];
    data.data.children.forEach(
      (c: {
        data: {
          preview: {
            images: {
              resolutions: {
                url: string;
              }[];
            }[];
          };
          title: string;
        };
      }) => {
        /*
        {
            "data": {
                "title": "Hendrix on his way to gather sheep",
                "preview": {
                    "images": [
                        {
                            "resolutions": [
                                {},
                                {},
                                {
                                    "url": "https://img.cdn4dd.com/s/managed/interview/tps-dogs/dog10.jpeg"
                                }
                            ]
                        }
                    ]
                }
            }
        }
        */
        const title = c.data.title;
        const url = c.data.preview?.images[0]?.resolutions[2]?.url || "";
        url?.replace(/&amp;/g, "&");
        let urlSplit = url.split("/");
        let shortenedUrl = urlSplit[urlSplit.length - 1];
        if (url) {
          dogs.push({ title: title, url: shortenedUrl });
        }
      }
    );

    dispatch({ type: "IMAGES", payload: dogs });
  }, [data]);

  useEffect(() => {
    if (data) getImages();
  }, [data, getImages]);

  return (
    <section className="container">
      <h1>Demo</h1>
      {isLoading && <p>Loading...</p>}
      {images.length > 0 && <img alt={idx.toString()} src={images[idx].url} />}
      <div className="row">
        <button
          onClick={() => dispatch({ type: "INDEX", payload: -1 })}
          className="prev"
        >
          {"<<"}
        </button>
        <span className="title">{images.length > 0 && images[idx].title}</span>
        <button
          onClick={() => dispatch({ type: "INDEX", payload: 1 })}
          className="prev"
        >
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
              votes: 0,
            };

            let tempComments = Object.assign({}, comments);
            if (comments[idx])
              tempComments[idx] = tempComments[idx].concat([newComment]);
            else tempComments[idx] = [newComment];

            dispatch({ type: "COMMENT", payload: tempComments });
          }}
        >
          Submit
        </button>
      </div>
      <ul>
        {comments[idx] &&
          comments[idx].map((c, i) => (
            <li key={i}>
              {c.text} | {c.votes}{" "}
              <button
                onClick={() => {
                  let tempComments = [...comments[idx]];
                  tempComments[i].votes++;
                  dispatch({
                    type: "COMMENT",
                    payload: {
                      ...comments,
                      [idx]: tempComments,
                    },
                  });
                }}
              >
                Upvote
              </button>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default App;
