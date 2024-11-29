import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { Briefcase } from "lucide-react";
import { useSelector } from "react-redux";

const Jobs = () => {
  const { allJobs = [], searchedQuery = "" } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState([]);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) 
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-[#6A38C2] mb-2">
            <Briefcase className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">Available Positions</span>
          </div>
          <h1 className="text-4xl font-bold">
            Browse Our Latest <span className="text-[#6A38C2]">Job Openings</span>
          </h1>
          <p className="text-gray-600 mt-2 max-w-2xl">
            Discover opportunities that match your experience and career goals.
          </p>
        </div>

        <div className="flex gap-8">
          {/* Filter Section */}
          <div className="w-1/4 flex-shrink-0">
            <div className="sticky top-8">
              <FilterCard />
            </div>
          </div>

          {/* Jobs Grid */}
          {filterJobs.length <= 0 ? (
            <div className="flex-1 flex items-center justify-center h-[60vh] bg-white rounded-xl border border-gray-200">
              <div className="text-center">
                <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Jobs Found</h3>
                <p className="text-gray-500">Try adjusting your search filters</p>
              </div>
            </div>
          ) : (
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filterJobs.map((job, index) => (
                  <div
                    key={job?._id}
                    className="transform hover:scale-[1.02] transition-all duration-300"
                    style={{
                      animationDelay: `${index * 150}ms`,
                      animation: "fade-in-up 0.5s ease-out forwards",
                      opacity: 0,
                    }}
                  >
                    <Job job={job} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;