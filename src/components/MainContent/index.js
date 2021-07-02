import React, { useState, useEffect } from "react";
import { Input, List, Card, Modal, Row, Col, Tag, Statistic, Spin } from "antd";
import { LikeOutlined } from "@ant-design/icons";
import axios from "axios";

const { Search } = Input;
const { Meta } = Card;

const MainContent = () => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [activeMovie, setActiveMovie] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [movieLoading, setMovieLoading] = useState(false);
  const [heading, setHeading] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setLoading(true);

    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      )
      .then((res) => {
        setMovies(res.data.results);
        setHeading("Popular Movies");
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => {
        setLoading(false);
      });

    // return () => {
    //   cleanup;
    // };
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getMovies = () => {
    setLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${query}&page=1`
      )
      .then((res) => {
        // console.log(res.data.results);
        const movies = [...res.data.results];
        setMovies(movies);
        if (movies.length <= 0) {
          setMessage("No movie found...");
          setHeading("");
        } else {
          setHeading(`${movies.length} Movies Found`);
        }
      })
      .catch((err) => {
        setMessage(err.response.data.errors);
        throw err;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getMovie = (id) => {
    setMovieLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      )
      .then((res) => {
        // console.log(res.data);
        setMovieLoading(false);
        setActiveMovie(res.data);
      })
      .catch((err) => {
        throw err;
      });
  };
  
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <Search
        placeholder="Enter movie name..."
        enterButton="Search"
        size="large"
        loading={loading}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        onSearch={getMovies}
        style={{ display: "block", margin: "1rem auto", width: "80%" }}
      />
      {heading && <h1>{heading}</h1>}
      {movies.length > 0 ? (
        <Spin spinning={loading}>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 2,
              lg: 3,
              xl: 4,
              xxl: 3,
            }}
            dataSource={movies}
            renderItem={(item, index) => {
              return (
                <List.Item
                  key={index}
                  onClick={() => {
                    getMovie(item.id);
                    showModal();
                  }}
                >
                  <Card
                    hoverable
                    style={{ width: 240, margin: "0 auto", textAlign: "center" }}
                    cover={
                      <img
                        alt={item.title}
                        src={
                          item.poster_path
                            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                            : "https://i.stack.imgur.com/y9DpT.jpg"
                        }
                        style={{ height: "350px" }}
                      />
                    }
                  >
                    <Meta title={item.title} description={item.release_date ? item.release_date.substring(0, 4): ""} />
                  </Card>
                </List.Item>
              )
            }}
          />
        </Spin>
      ) : (
        <h5>{message}</h5>
      )}
      {activeMovie && (
        <Modal
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width={1000}
          centered
        >
          <Spin spinning={movieLoading}>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <img
                  src={
                    activeMovie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${activeMovie.poster_path}`
                      : "https://i.stack.imgur.com/y9DpT.jpg"
                  }
                  alt={activeMovie.title}
                  style={{ width: "100%" }}
                />
              </Col>
              <Col xs={24} md={16}>
                <h1 style={{ marginBottom: "5px" }}>{activeMovie.title}</h1>
                <h2>{activeMovie.tagline}</h2>
                <h2>{activeMovie.release_date ? activeMovie.release_date.substring(0, 4) : ""}</h2>
                <div style={{ marginBottom: "1rem" }}>
                  {activeMovie.genres.map((genre, index) => (
                    <Tag key={index} color="default">
                      {genre.name}
                    </Tag>
                  ))}
                </div>
                <p>{activeMovie.overview}</p>
                <div>
                  <Statistic
                    title="Votes"
                    value={activeMovie.vote_count}
                    prefix={<LikeOutlined />}
                  />
                </div>
              </Col>
            </Row>
          </Spin>
        </Modal>
      )}
    </div>
  );
};

export default MainContent;
