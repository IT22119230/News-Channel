import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';

export default function Culture() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news/get'); // Adjust API URL as needed
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Filter news by category "Health"
        const healthNews = data.filter(item => item.category === 'Culture');

        // Sort news by publishedDate in descending order (latest news first)
        const sortedNews = healthNews.sort((a, b) => {
          // Ensure the publishedDate is a valid date string
          return new Date(b.publishedDate) - new Date(a.publishedDate);
        });

        setNews(sortedNews);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  // Function to sanitize and allow specific HTML tags
  const sanitizeHTML = (html) => {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['b', 'i', 'u', 'a', 'p', 'strong', 'em', 'br', 'span'],
      ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
    });
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Culture & Trend News</h1>
      {news.length === 0 ? (
        <p className="text-center text-lg text-gray-500">No news available</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Headline - Latest Health News */}
            {news.length > 0 && (
              <div className="md:col-span-2 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition">
                <Link to={`/news/${news[0].slug}`} key={news[0]._id}>
                  <img
                    src={news[0].Picture || 'https://via.placeholder.com/600x400'}
                    alt={sanitizeHTML(news[0].Newsname)}
                    className="w-full h-80 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: sanitizeHTML(news[0].Newsname),
                        }}
                      />
                    </h2>
                    <p className="text-gray-600">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: sanitizeHTML(news[0].descreption).slice(0, 150) + '...',
                        }}
                      />
                    </p>
                  </div>
                </Link>
              </div>
            )}

            {/* Smaller Headlines */}
            <div className="space-y-4">
              {news.slice(1, 3).map((item) => (
                <Link
                  to={`/news/${item.slug}`}
                  key={item._id}
                  className="flex items-center gap-4 bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition"
                >
                  <img
                    src={item.Picture || 'https://via.placeholder.com/100x100'}
                    alt={sanitizeHTML(item.Newsname)}
                    className="w-32 h-20 object-cover rounded-l-lg"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: sanitizeHTML(item.Newsname),
                        }}
                      />
                    </h3>
                    <p className="text-sm text-gray-600">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: sanitizeHTML(item.descreption).slice(0, 80) + '...',
                        }}
                      />
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Additional News List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
            {news.slice(3).map((item) => (
              <Link
                to={`/news/${item.slug}`}
                key={item._id}
                className="block bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition"
              >
                <img
                  src={item.Picture || 'https://via.placeholder.com/150'}
                  alt={sanitizeHTML(item.Newsname)}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-gray-800">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: sanitizeHTML(item.Newsname),
                      }}
                    />
                  </h4>
                  <p className="text-sm text-gray-600 mt-2">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: sanitizeHTML(item.descreption).slice(0, 100) + '...',
                      }}
                    />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
