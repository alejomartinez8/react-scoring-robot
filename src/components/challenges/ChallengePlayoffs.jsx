import React from "react";
import "./ChallengePlayoffs.css";

const ChallengePlayoffs = () => {
  return (
    <div className="container">
      <h1>Responsive Tournament Bracket</h1>
      <h2>Ice hockey at the 1998 Winter Olympics – Men's tournament</h2>
      <div className="tournament-bracket tournament-bracket--rounded">
        <div className="tournament-bracket__round tournament-bracket__round--quarterfinals">
          <h3 className="tournament-bracket__round-title">Quarterfinals</h3>
          <ul className="tournament-bracket__list">
            <li className="tournament-bracket__item">
              <div className="tournament-bracket__match" tabindex="0">
                <table className="tournament-bracket__table">
                  <caption className="tournament-bracket__caption">
                    <time datetime="1998-02-18">18 February 1998</time>
                  </caption>
                  <thead className="sr-only">
                    <tr>
                      <th>Country</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody className="tournament-bracket__content">
                    <tr className="tournament-bracket__team tournament-bracket__team--winner">
                      <td className="tournament-bracket__country">
                        <abbr className="tournament-bracket__code" title="Canada">
                          CAN
                        </abbr>
                        <span
                          className="tournament-bracket__flag flag-icon flag-icon-ca"
                          aria-label="Flag"
                        ></span>
                      </td>
                      <td className="tournament-bracket__score">
                        <span className="tournament-bracket__number">4</span>
                      </td>
                    </tr>
                    <tr className="tournament-bracket__team">
                      <td className="tournament-bracket__country">
                        <abbr
                          className="tournament-bracket__code"
                          title="Kazakhstan"
                        >
                          KAZ
                        </abbr>
                        <span
                          className="tournament-bracket__flag flag-icon flag-icon-kz"
                          aria-label="Flag"
                        ></span>
                      </td>
                      <td className="tournament-bracket__score">
                        <span className="tournament-bracket__number">1</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>

            <li className="tournament-bracket__item">
              <div className="tournament-bracket__match" tabindex="0">
                <table className="tournament-bracket__table">
                  <caption className="tournament-bracket__caption">
                    <time datetime="1998-02-18">18 February 1998</time>
                  </caption>
                  <thead className="sr-only">
                    <tr>
                      <th>Country</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody className="tournament-bracket__content">
                    <tr className="tournament-bracket__team tournament-bracket__team--winner">
                      <td className="tournament-bracket__country">
                        <abbr
                          className="tournament-bracket__code"
                          title="Czech Republic"
                        >
                          CZE
                        </abbr>
                        <span
                          className="tournament-bracket__flag flag-icon flag-icon-cz"
                          aria-label="Flag"
                        ></span>
                      </td>
                      <td className="tournament-bracket__score">
                        <span className="tournament-bracket__number">4</span>
                      </td>
                    </tr>
                    <tr className="tournament-bracket__team">
                      <td className="tournament-bracket__country">
                        <abbr
                          className="tournament-bracket__code"
                          title="Unitede states of America"
                        >
                          USA
                        </abbr>
                        <span
                          className="tournament-bracket__flag flag-icon flag-icon-us"
                          aria-label="Flag"
                        ></span>
                      </td>
                      <td className="tournament-bracket__score">
                        <span className="tournament-bracket__number">1</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
            <li className="tournament-bracket__item">
              <div className="tournament-bracket__match" tabindex="0">
                <table className="tournament-bracket__table">
                  <caption className="tournament-bracket__caption">
                    <time datetime="1998-02-18">18 February 1998</time>
                  </caption>
                  <thead className="sr-only">
                    <tr>
                      <th>Country</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody className="tournament-bracket__content">
                    <tr className="tournament-bracket__team tournament-bracket__team--winner">
                      <td className="tournament-bracket__country">
                        <abbr className="tournament-bracket__code" title="Finland">
                          FIN
                        </abbr>
                        <span
                          className="tournament-bracket__flag flag-icon flag-icon-fi"
                          aria-label="Flag"
                        ></span>
                      </td>
                      <td className="tournament-bracket__score">
                        <span className="tournament-bracket__number">2</span>
                      </td>
                    </tr>
                    <tr className="tournament-bracket__team">
                      <td className="tournament-bracket__country">
                        <abbr className="tournament-bracket__code" title="Sweden">
                          SVE
                        </abbr>
                        <span
                          className="tournament-bracket__flag flag-icon flag-icon-se"
                          aria-label="Flag"
                        ></span>
                      </td>
                      <td className="tournament-bracket__score">
                        <span className="tournament-bracket__number">1</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>

            <li className="tournament-bracket__item">
              <div className="tournament-bracket__match" tabindex="0">
                <table className="tournament-bracket__table">
                  <caption className="tournament-bracket__caption">
                    <time datetime="1998-02-18">18 February 1998</time>
                  </caption>
                  <thead className="sr-only">
                    <tr>
                      <th>Country</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody className="tournament-bracket__content">
                    <tr className="tournament-bracket__team tournament-bracket__team--winner">
                      <td className="tournament-bracket__country">
                        <abbr className="tournament-bracket__code" title="Russia">
                          RUS
                        </abbr>
                        <span
                          className="tournament-bracket__flag flag-icon flag-icon-ru"
                          aria-label="Flag"
                        ></span>
                      </td>
                      <td className="tournament-bracket__score">
                        <span className="tournament-bracket__number">4</span>
                      </td>
                    </tr>
                    <tr className="tournament-bracket__team">
                      <td className="tournament-bracket__country">
                        <abbr className="tournament-bracket__code" title="Belarus">
                          BEL
                        </abbr>
                        <span
                          className="tournament-bracket__flag flag-icon flag-icon-by"
                          aria-label="Flag"
                        ></span>
                      </td>
                      <td className="tournament-bracket__score">
                        <span className="tournament-bracket__number">1</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
          </ul>
        </div>
        <div className="tournament-bracket__round tournament-bracket__round--semifinals">
          <h3 className="tournament-bracket__round-title">Semifinals</h3>
          <ul className="tournament-bracket__list">
            <li className="tournament-bracket__item">
              <div className="tournament-bracket__match" tabindex="0">
                <table className="tournament-bracket__table">
                  <caption className="tournament-bracket__caption">
                    <time datetime="1998-02-20">20 February 1998</time>
                  </caption>
                  <thead className="sr-only">
                    <tr>
                      <th>Country</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody className="tournament-bracket__content">
                    <tr className="tournament-bracket__team">
                      <td className="tournament-bracket__country">
                        <abbr className="tournament-bracket__code" title="Canada">
                          CAN
                        </abbr>
                        <span
                          className="tournament-bracket__flag flag-icon flag-icon-ca"
                          aria-label="Flag"
                        ></span>
                      </td>
                      <td className="tournament-bracket__score">
                        <span className="tournament-bracket__number">1</span>
                      </td>
                    </tr>
                    <tr className="tournament-bracket__team tournament-bracket__team--winner">
                      <td className="tournament-bracket__country">
                        <abbr
                          className="tournament-bracket__code"
                          title="Czech Republic"
                        >
                          CZE
                        </abbr>
                        <span
                          className="tournament-bracket__flag flag-icon flag-icon-cz"
                          aria-label="Flag"
                        ></span>
                      </td>
                      <td className="tournament-bracket__score">
                        <span className="tournament-bracket__number">2</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>

            <li className="tournament-bracket__item">
              <div className="tournament-bracket__match" tabindex="0">
                <table className="tournament-bracket__table">
                  <caption className="tournament-bracket__caption">
                    <time datetime="1998-02-20">20 February 1998</time>
                  </caption>
                  <thead className="sr-only">
                    <tr>
                      <th>Country</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody className="tournament-bracket__content">
                    <tr className="tournament-bracket__team">
                      <td className="tournament-bracket__country">
                        <abbr className="tournament-bracket__code" title="Finland">
                          FIN
                        </abbr>
                        <span
                          className="tournament-bracket__flag flag-icon flag-icon-fi"
                          aria-label="Flag"
                        ></span>
                      </td>
                      <td className="tournament-bracket__score">
                        <span className="tournament-bracket__number">4</span>
                      </td>
                    </tr>
                    <tr className="tournament-bracket__team tournament-bracket__team--winner">
                      <td className="tournament-bracket__country">
                        <abbr className="tournament-bracket__code" title="Russia">
                          RUS
                        </abbr>
                        <span
                          className="tournament-bracket__flag flag-icon flag-icon-ru"
                          aria-label="Flag"
                        ></span>
                      </td>
                      <td className="tournament-bracket__score">
                        <span className="tournament-bracket__number">7</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
          </ul>
        </div>
        <div className="tournament-bracket__round tournament-bracket__round--bronze">
          <h3 className="tournament-bracket__round-title">Bronze medal game</h3>
          <ul className="tournament-bracket__list">
            <li className="tournament-bracket__item">
              <div className="tournament-bracket__match" tabindex="0">
                <table className="tournament-bracket__table">
                  <caption className="tournament-bracket__caption">
                    <time datetime="1998-02-21">21 February 1998</time>
                  </caption>
                  <thead className="sr-only">
                    <tr>
                      <th>Country</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody className="tournament-bracket__content">
                    <tr className="tournament-bracket__team tournament-bracket__team--winner">
                      <td className="tournament-bracket__country">
                        <abbr className="tournament-bracket__code" title="Finland">
                          FIN
                        </abbr>
                        <span
                          className="tournament-bracket__flag flag-icon flag-icon-fi"
                          aria-label="Flag"
                        ></span>
                      </td>
                      <td className="tournament-bracket__score">
                        <span className="tournament-bracket__number">3</span>
                        <span
                          className="tournament-bracket__medal tournament-bracket__medal--bronze fa fa-trophy"
                          aria-label="Bronze medal"
                        ></span>
                      </td>
                    </tr>
                    <tr className="tournament-bracket__team">
                      <td className="tournament-bracket__country">
                        <abbr className="tournament-bracket__code" title="Canada">
                          CAN
                        </abbr>
                        <span
                          className="tournament-bracket__flag flag-icon flag-icon-ca"
                          aria-label="Flag"
                        ></span>
                      </td>
                      <td className="tournament-bracket__score">
                        <span className="tournament-bracket__number">2</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
          </ul>
        </div>
        <div className="tournament-bracket__round tournament-bracket__round--gold">
          <h3 className="tournament-bracket__round-title">Gold medal game</h3>
          <ul className="tournament-bracket__list">
            <li className="tournament-bracket__item">
              <div className="tournament-bracket__match" tabindex="0">
                <table className="tournament-bracket__table">
                  <caption className="tournament-bracket__caption">
                    <time datetime="1998-02-22">22 February 1998</time>
                  </caption>
                  <thead className="sr-only">
                    <tr>
                      <th>Country</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody className="tournament-bracket__content">
                    <tr className="tournament-bracket__team tournament-bracket__team--winner">
                      <td className="tournament-bracket__country">
                        <abbr
                          className="tournament-bracket__code"
                          title="Czech Republic"
                        >
                          CZE
                        </abbr>
                        <span
                          className="tournament-bracket__flag flag-icon flag-icon-cz"
                          aria-label="Flag"
                        ></span>
                      </td>
                      <td className="tournament-bracket__score">
                        <span className="tournament-bracket__number">1</span>
                        <span
                          className="tournament-bracket__medal tournament-bracket__medal--gold fa fa-trophy"
                          aria-label="Gold medal"
                        ></span>
                      </td>
                    </tr>
                    <tr className="tournament-bracket__team">
                      <td className="tournament-bracket__country">
                        <abbr className="tournament-bracket__code" title="Russia">
                          RUS
                        </abbr>
                        <span
                          className="tournament-bracket__flag flag-icon flag-icon-ru"
                          aria-label="Flag"
                        ></span>
                      </td>
                      <td className="tournament-bracket__score">
                        <span className="tournament-bracket__number">0</span>
                        <span
                          className="tournament-bracket__medal tournament-bracket__medal--silver fa fa-trophy"
                          aria-label="Silver medal"
                        ></span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChallengePlayoffs;
