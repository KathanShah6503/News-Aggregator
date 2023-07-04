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

  //sedning a GET request to the server with the specified parameters
  const sendSearchRequest = () => {
    if (fromDate && toDate && fromDate > toDate) {
      alert('From date must be less than or equal to To date');
      return;
    }
    const results = {
      method: 'GET',
      url: 'http://localhost:5001/results',
      params: {
        q: searchQuery,
        fromDate: fromDate ? fromDate.toISOString() : null,
        toDate: toDate ? toDate.toISOString() : null,
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
        <div className='type-selector'>
          <ul>
            <li>
              <form>
                <label>
                  <input
                    className='form'
                    type='text'
                    placeholder='Search for news...'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </label>
              </form>
            </li>
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
            {/* <li>
              <select
                name='dateRange'
                id='dateRange'
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value={null}>Select date range (optional)</option>
                <option value='7'>Past 7 Days</option>
                <option value='14'>Past 14 Days</option>
                <option value='21'>Past 21 Days</option>
                <option value='30'>Past 30 Days</option>
              </select>
            </li> */}
            <li className='search'>
              <button onClick={sendSearchRequest}>Search</button>
            </li>
          </ul>
        </div>
{/* how client handles the docuemens retrieved from the server */}
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
                  <p>Category: {document._source.category}</p>
                  {/* <p>Content: {document._source.content}</p> */}
                  <p>Description: {document._source.short_description}</p>
                  <p>Time: {document._source['@timestamp']}</p>
                  {/* <p>Source: {document._source.name}</p> */}
                  <p>Author: {document._source.authors}</p>
                  <p>Article URL: {document._source.link}</p>
                  {/* <p>Significance: {document._source.sig}</p> */}
                  {/* <p>Image URL: {document._source.imageUrl}</p> */}
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