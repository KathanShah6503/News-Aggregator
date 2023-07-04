import axios from 'axios';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  // const [dateRange, setDateRange] = useState(null);
  const [documents, setDocuments] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [categories, setCategories] = useState([]);

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setCategories([...categories, value]);
    } else {
      setCategories(categories.filter((category) => category !== value));
    }
  };

  const sendSearchRequest = () => {
    if (fromDate && toDate && fromDate > toDate) {
      alert('From date must be less than or equal to To date');
      return;
    }
    const results = {
      method: 'GET',
      url: 'http://localhost:3001/results',
      params: {
        q: searchQuery,
        fromDate: fromDate ? fromDate.toISOString() : null,
        toDate: toDate ? toDate.toISOString() : null,
        category: categories,
      },
    };
    axios
      .request(results)
      .then((response) => {
        console.log(response.data);
        setDocuments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='app'>
      <nav>
        <ul className='nav-bar'>
          <li>News Aggregator</li>
        </ul>
      </nav>
      <p className='directions'>
        {' '}
        Search for news articles using the following criteria:
      </p>
      <div className='main'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendSearchRequest();
          }}
        >
          <div className='type-selector'>
            <ul>
              <li>
                <label>
                  <input
                    className='form'
                    type='text'
                    placeholder='Search for news...'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </label>
              </li>
              <li>
                <div className='dropdown'>
                  <button className='dropbtn'>Categories</button>
                  <div className='dropdown-content'>
                  <label>
                    <input type='checkbox' value='POLITICS' checked={categories.includes('POLITICS')} onChange={handleCategoryChange} />
                    POLITICS
                  </label>
                  <label>
                    <input type='checkbox' value='WELLNESS' checked={categories.includes('WELLNESS')} onChange={handleCategoryChange} />
                    WELLNESS
                  </label>
                  <label>
                    <input type='checkbox' value='ENTERTAINMENT' checked={categories.includes('ENTERTAINMENT')} onChange={handleCategoryChange} />
                    ENTERTAINMENT
                  </label>
                  <label>
                    <input type='checkbox' value='TRAVEL' checked={categories.includes('TRAVEL')} onChange={handleCategoryChange} />
                    TRAVEL
                  </label>
                  <label>
                    <input type='checkbox' value='STYLE & BEAUTY' checked={categories.includes('STYLE & BEAUTY')} onChange={handleCategoryChange} />
                    STYLE & BEAUTY
                  </label>
                  <label>
                    <input type='checkbox' value='PARENTING' checked={categories.includes('PARENTING')} onChange={handleCategoryChange} />
                    PARENTING
                  </label>
                  <label>
                    <input type='checkbox' value='HEALTHY LIVING' checked={categories.includes('HEALTHY LIVING')} onChange={handleCategoryChange} />
                    HEALTHY LIVING
                  </label>
                  <label>
                    <input type='checkbox' value='QUEER VOICES' checked={categories.includes('QUEER VOICES')} onChange={handleCategoryChange} />
                    QUEER VOICES
                  </label>
                  <label>
                    <input type='checkbox' value='FOOD & DRINK' checked={categories.includes('FOOD & DRINK')} onChange={handleCategoryChange} />
                    FOOD & DRINK
                  </label>
                  <label>
                    <input type='checkbox' value='BUSINESS' checked={categories.includes('BUSINESS')} onChange={handleCategoryChange} />
                    BUSINESS
                  </label>
                  <label>
                    <input type='checkbox' value='COMEDY' checked={categories.includes('COMEDY')} onChange={handleCategoryChange} />
                    COMEDY
                  </label>
                  <label>
                    <input type='checkbox' value='SPORTS' checked={categories.includes('SPORTS')} onChange={handleCategoryChange} />
                    SPORTS
                  </label>
                  <label>
                    <input type='checkbox' value='BLACK VOICES' checked={categories.includes('BLACK VOICES')} onChange={handleCategoryChange} />
                    BLACK VOICES
                  </label>
                  <label>
                    <input type='checkbox' value='HOME & LIVING' checked={categories.includes('HOME & LIVING')} onChange={handleCategoryChange} />
                    HOME & LIVING
                  </label>
                  <label>
                    <input type='checkbox' value='PARENTS' checked={categories.includes('PARENTS')} onChange={handleCategoryChange} />
                    PARENTS
                  </label>
                  <label>
                    <input type='checkbox' value='THE WORLDPOST' checked={categories.includes('THE WORLDPOST')} onChange={handleCategoryChange} />
                    THE WORLDPOST
                  </label>
                  <label>
                    <input type='checkbox' value='WEDDINGS' checked={categories.includes('WEDDINGS')} onChange={handleCategoryChange} />
                    WEDDINGS
                  </label>
                  <label>
                    <input type='checkbox' value='WOMEN' checked={categories.includes('WOMEN')} onChange={handleCategoryChange} />
                    WOMEN
                  </label>
                  <label>
                    <input type='checkbox' value='CRIME' checked={categories.includes('CRIME')} onChange={handleCategoryChange} />
                    CRIME
                  </label>
                  <label>
                    <input type='checkbox' value='IMPACT' checked={categories.includes('IMPACT')} onChange={handleCategoryChange} />
                    IMPACT
                  </label>
                  <label>
                    <input type='checkbox' value='DIVORCE' checked={categories.includes('DIVORCE')} onChange={handleCategoryChange} />
                    DIVORCE
                  </label>
                  <label>
                    <input type='checkbox' value='WORLD NEWS' checked={categories.includes('WORLD NEWS')} onChange={handleCategoryChange} />
                    WORLD NEWS
                  </label>
                  <label>
                    <input type='checkbox' value='MEDIA' checked={categories.includes('MEDIA')} onChange={handleCategoryChange} />
                    MEDIA
                  </label>
                  <label>
                    <input type='checkbox' value='WEIRD NEWS' checked={categories.includes('WEIRD NEWS')} onChange={handleCategoryChange} />
                    WEIRD NEWS
                  </label>
                  <label>
                    <input type='checkbox' value='GREEN' checked={categories.includes('GREEN')} onChange={handleCategoryChange} />
                    GREEN
                  </label>
                  <label>
                    <input type='checkbox' value='WORLDPOST' checked={categories.includes('WORLDPOST')} onChange={handleCategoryChange} />
                    WORLDPOST
                  </label>
                  <label>
                    <input type='checkbox' value='RELIGION' checked={categories.includes('RELIGION')} onChange={handleCategoryChange} />
                    RELIGION
                  </label>
                  <label>
                    <input type='checkbox' value='STYLE' checked={categories.includes('STYLE')} onChange={handleCategoryChange} />
                    STYLE
                  </label>
                  <label>
                    <input type='checkbox' value='SCIENCE' checked={categories.includes('SCIENCE')} onChange={handleCategoryChange} />
                    SCIENCE
                  </label>
                  <label>
                    <input type='checkbox' value='TECH' checked={categories.includes('TECH')} onChange={handleCategoryChange} />
                    TECH
                  </label>
                  <label>
                    <input type='checkbox' value='TASTE' checked={categories.includes('TASTE')} onChange={handleCategoryChange} />
                    TASTE
                  </label>
                  <label>
                    <input type='checkbox' value='MONEY' checked={categories.includes('MONEY')} onChange={handleCategoryChange} />
                    MONEY
                  </label>
                  <label>
                    <input type='checkbox' value='ARTS' checked={categories.includes('ARTS')} onChange={handleCategoryChange} />
                    ARTS
                  </label>
                  <label>
                    <input type='checkbox' value='ENVIRONMENT' checked={categories.includes('ENVIRONMENT')} onChange={handleCategoryChange} />
                    ENVIRONMENT
                  </label>
                  <label>
                    <input type='checkbox' value='FIFTY' checked={categories.includes('FIFTY')} onChange={handleCategoryChange} />
                    FIFTY
                  </label>
                  <label>
                    <input type='checkbox' value='GOOD NEWS' checked={categories.includes('GOOD NEWS')} onChange={handleCategoryChange} />
                    GOOD NEWS
                  </label>
                  <label>
                    <input type='checkbox' value='U.S. NEWS' checked={categories.includes('U.S. NEWS')} onChange={handleCategoryChange} />
                    U.S. NEWS
                  </label>
                  <label>
                    <input type='checkbox' value='ARTS & CULTURE' checked={categories.includes('ARTS & CULTURE')} onChange={handleCategoryChange} />
                    ARTS & CULTURE
                  </label>
                  <label>
                    <input type='checkbox' value='COLLEGE' checked={categories.includes('COLLEGE')} onChange={handleCategoryChange} />
                    COLLEGE
                  </label>
                  <label>
                    <input type='checkbox' value='LATINO VOICES' checked={categories.includes('LATINO VOICES')} onChange={handleCategoryChange} />
                    LATINO VOICES
                  </label>
                  <label>
                    <input type='checkbox' value='CULTURE & ARTS' checked={categories.includes('CULTURE & ARTS')} onChange={handleCategoryChange} />
                    CULTURE & ARTS
                  </label>
                  <label>
                    <input type='checkbox' value='EDUCATION' checked={categories.includes('EDUCATION')} onChange={handleCategoryChange} />
                    EDUCATION
                  </label>
                  </div>
                </div>
              </li>
              <li>
                <button className='search'onClick={sendSearchRequest}>Search</button>
              </li>
            </ul>
          </div>
          <div className='type-selector'>
            <ul>
              <li>
                <DatePicker
                  selected={fromDate}
                  onChange={(date) => setFromDate(date)}
                  selectsStart
                  startDate={fromDate}
                  endDate={toDate}
                  placeholderText='From'
                  maxDate = {new Date()}
                />
              </li>
              <li>
                <DatePicker
                  selected={toDate}
                  onChange={(date) => setToDate(date)}
                  selectsEnd
                  startDate={fromDate}
                  endDate={toDate}
                  placeholderText='To'
                  maxDate = {new Date()}
                />
              </li>
            </ul>
          </div>
        </form>
        {documents && (
          <div className='search-results'>
            {documents.length > 0 ? (
              <p> Number of hits: {documents.length}</p>
            ) : (
              <p> No results found. Try broadening your search criteria.</p>
            )}
            {documents.map((document) => (
              <div className='results-card'>
                <div className='results-text'>
                  <p>Headline: {document._source.headline}</p>
                  <p>Description: {document._source.short_description}</p>
                  <p>Time: {document._source['@timestamp']}</p>
                  <p>Category: {document._source.category}</p>
                  <p>Author: {document._source.authors}</p>
                  <p>Article URL: {document._source.link}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;