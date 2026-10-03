import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h1 className="display-4 fw-bold">Student Task Management System</h1>

          <p className="lead mt-3">
            Manage your assignments, projects and academic tasks easily from one
            place.
          </p>

          <div className="mt-4">
            <Link to="/register" className="btn btn-primary btn-lg me-3">
              Sign Up
            </Link>

            <Link to="/login" className="btn btn-outline-primary btn-lg">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
