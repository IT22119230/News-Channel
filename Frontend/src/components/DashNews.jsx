import { Button, Modal, Table, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function DashNews() {
  const { currentUser } = useSelector((state) => state.user);
  const [news, setNews] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [newsIdToDelete, setNewsIdToDelete] = useState('');
  const [searchName, setSearchName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch news from the API
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/news/get');
        const data = await res.json();
        if (res.ok) {
          // Sort news by `updatedAt` in descending order
          const sortedNews = data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
          setNews(sortedNews);
        } else {
          setError('Failed to fetch news.');
        }
      } catch (error) {
        setError('Error fetching news: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.isAdmin) {
      fetchNews();
    }
  }, [currentUser?.isAdmin]);

  // Delete a news item
  const handleDelete = async () => {
    setShowModel(false);
    try {
      const res = await fetch(`/api/news/delete/${newsIdToDelete}`, { method: 'DELETE' });
      if (res.ok) {
        setNews(news.filter((item) => item._id !== newsIdToDelete));
      } else {
        setError('Failed to delete news.');
      }
    } catch (error) {
      setError('Error deleting news: ' + error.message);
    }
  };

  // Filter news based on the search input
  const filteredNews = news.filter((item) =>
    item.Newsname?.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 text-black">
      {/* Search Bar */}
      <div className="flex justify-center mb-4">
        <TextInput
          type="text"
          placeholder="Search a News (by news name)"
          required
          id="newsName"
          className="flex-1"
          style={{ width: 700 }}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>

      {/* Loading or Error Handling */}
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}

      {/* News Table */}
      {!loading && !error && (
        <>
          {filteredNews.length > 0 ? (
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell>Date Updated</Table.HeadCell>
                <Table.HeadCell>News Image</Table.HeadCell>
                <Table.HeadCell>News Title</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
                <Table.HeadCell>Edit</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {filteredNews.map((item) => (
                  <Table.Row key={item._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>{new Date(item.updatedAt).toLocaleDateString()}</Table.Cell>
                    <Table.Cell>
                      <Link to={`/news/${item.slug}`}>
                        <img
                          src={item.Picture || '/placeholder-image.png'}
                          alt={item.Newsname}
                          className="w-20 h-10 object-cover bg-gray-500"
                        />
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link className="font-medium text-gray-900 dark:text-white" to={`/news/${item.slug}`}>
                        {item.Newsname}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>{item.category}</Table.Cell>
                    <Table.Cell>
                      <span
                        className="font-medium text-red-500 hover:underline cursor-pointer"
                        onClick={() => {
                          setShowModel(true);
                          setNewsIdToDelete(item._id);
                        }}
                      >
                        Delete
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <Link className="text-teal-500 hover:underline" to={`/update-news/${item._id}`}>
                        Edit
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          ) : (
            <p className="text-center">No news matches your search.</p>
          )}
        </>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showModel} onClose={() => setShowModel(false)} popup size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500">
              Are you sure you want to remove this News?
            </h3>
          </div>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={handleDelete}>
              Yes, I am sure
            </Button>
            <Button color="gray" onClick={() => setShowModel(false)}>
              No, cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
