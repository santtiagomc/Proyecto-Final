return (
  <div className={style.panel_genres}>
    {!genres.length
      ? <img src={Loader} alt="Loader_Logo"></img>
      : (
        <div className={style.container}>
          <div className={style.genreListContainer}>
            <div className={style.labelContainer}>
              <label className={style.label1}>#</label>
              <label className={style.label2}>Categoría</label>
              <button
                className={style.btn_rank}
                onClick={() => setRank(rank === "A-Z" ? "Z-A" : "A-Z")}
              >
                {rank === "A-Z" ? (
                  <AiOutlineSortAscending className={style.btn_rank} />
                ) : (
                  <AiOutlineSortDescending className={style.btn_rank} />
                )}
              </button>
            </div>
            <div className={style.genreList}>
              {genres &&
                genres.length &&
                genres.map((el, index) => {
                  return (
                    <div key={index} className={style.genreLine}>
                      <span className={style.span1}>{index + 1}</span>
                      <span className={style.span2}>{el}</span>
                      <button
                        className={style.btnDelete}
                        onClick={(e) => handleDelete(e, el)}
                      >
                        <BsFillTrashFill />
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className={style.stats_container}>
            <div className={style.subContainer}>
              <div className={style.stats}>
                <div className={style.addGenre}>
                  <label className={style.label}>Crear categoría</label>
                  <form onSubmit={(e) => handleSubmit(e)} className={style.form}>
                    <input
                      type="text"
                      placeholder="Misterio"
                      autoFocus
                      onChange={(e) => handleChange(e)}
                    />
                    {errors.length > 1 && <span>{errors}</span>}
                    <button type="submit">Añadir categoría</button>
                  </form>
                </div>
              </div>
              <div className={style.stats}>tarjeta2</div>
            </div>
            <div className={style.subContainer}>
              <div className={style.stats}>tarjeta3</div>
              <div className={style.stats}>tarjeta 4</div>
            </div>
          </div>
        </div>
      )}
  </div>
);
