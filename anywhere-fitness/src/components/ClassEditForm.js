import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { axiosWithAuth } from "../utils/axiosWithAuth";


const ClassEditForm = (props) => {
	const { push } = useHistory();
	const {id} = useParams();

		const [classDetails, setClassDetails] = useState({
			class_name: "",
			location: "",
			date: "", //YYYY/MM/DD
			start_time: "", //HH:MM:SS
			type_id: 1
		  });
		  console.log("Edite:id:",id);


		  const getClassData = () => {
			axiosWithAuth()
			  .get(`/api/classes/${id}`)
			  .then((res) => {
			     console.log("Edit Data:", res);
				 setClassDetails(res.data);
			  })
			  .catch((err) => {
				console.log(err);
			  });
		  };

		  useEffect(() => {
			getClassData();
		  }, []);




		  const handleChange = (e) => {
			let value = e.target.value;
			if (e.target.name === "type_id") {
			  value = parseInt(value, 10);
			}
			setClassDetails({ ...classDetails, [e.target.name]: value });
		}
	
    const handleSubmit = (e) => {
		e.preventDefault();
		const editedClass={
			class_name: classDetails.class_name,
			location: classDetails.location,
			date: classDetails.date, 
			start_time: classDetails.start_time, 
			type_id: classDetails.type_id
		}
		console.log("Edite:id:",id);
		console.log("Edit:EditedClass:", editedClass);
		axiosWithAuth()
		.patch(`/api/classes/${id}`, editedClass)
		.then(res=>{
			console.log("edited Res: ", res);
			setClassDetails(res.data);
            push('/classlist');
		})
		.catch(err=>{
			console.log(err);
		})
		
	}
	
	const { class_name, location, date, start_time, type_id } = classDetails;

	return (
		<div className="col">
		  <div className="modal-content">
			<form onSubmit={handleSubmit}>
			  <div className="modal-header">
				<h4 className="modal-title">
				  Edit <strong>Class-Details</strong>
				</h4>
			  </div>
			  <div className="modal-body">
				<div className="form-group">
				  <label>Class-Name:</label>
				  <input
					value={class_name}
					onChange={handleChange}
					name="class_name"
					type="text"
					className="form-control"
				  />
				</div>
				<div className="form-group">
				  <label>Location:</label>
				  <input
					value={location}
					onChange={handleChange}
					name="location"
					type="text"
					className="form-control"
				  ></input>
				</div>
				<div className="form-group">
				  <label>Date:(YYYY/MM/DD)</label>
				  <input
					value={date}
					onChange={handleChange}
					name="date"
					type="text"
					className="form-control"
				  ></input>
				</div>
				<div className="form-group">
				  <label>Start-Time:(HH:MM:SS)</label>
				  <input
					value={start_time}
					onChange={handleChange}
					name="start_time"
					type="text"
					className="form-control"
				  />
				</div>
				<div className="form-group">
				  <label>Class-Type:</label>
				  <input
					value={type_id}
					onChange={handleChange}
					name="type_id"
					type="number"
					className="form-control"
				  />
				</div>
			  </div>
			  <div className="modal-footer">
				<input type="submit" className="btn btn-info" value="Save" />
				<input type="button" className="btn btn-default" value="Cancel" />
			  </div>
			</form>
		  </div>
		</div>
	  );
}

	export default ClassEditForm;