import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import supabase from "../config/supabaseClient"
import { use } from "react"


const Update = () => {
  const { id } = useParams()
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [rating, setRating] = useState('');

  useEffect(() => {
    const fetchSmoothie = async () => {
      const { data, error } = await supabase.from('smoothies').select().eq('id', id).single()

      if(error){
        navigate('/', {replace: true}) //replacing current route in history with homepage
      }

      if(data){
        setTitle(data.title);
        setMethod(data.method);
        setRating(data.rating);
        console.log(data)
      }
    } 
    fetchSmoothie();
  }, [id, navigate])

  return (
    <div className="page update">
      <form>
        <label htmlFor="title">Title:</label>
        <input 
          type="text" 
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Method:</label>
        <textarea 
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input 
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Update Smoothie Recipe</button>

        {/* {formError && <p className="error">{formError}</p>} */}
      </form>
    </div>
  )
}

export default Update