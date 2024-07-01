import React, { useEffect, useState } from 'react';
import roadmapData from "../Data/roadmapData.json";
import './RoadmapContainer.css';

interface ItemDataType {
  itemLabel: string;
}

interface LaneDataType {
  items: ItemDataType[];
}

interface GroupDataType {
  groupLabel: string;
  lanes: LaneDataType[];
}

interface StreamDataType {
  key: React.Key;
  streamLabel: string;
  groups: GroupDataType[];
}

interface DataType {
  key: React.Key;
  stream: string;
  items: React.ReactNode;
}

const generateItems = (groups: GroupDataType[]): React.ReactNode => {
  return groups.map((group, index) => (
    <div className="group" key={index}>
      <div className="group-header">{group.groupLabel}</div>
      <div className="items">
        {group.lanes.flatMap((lane) =>
          lane.items.map((item) => (
            <div className="item" key={item.itemLabel}>
              {item.itemLabel}
            </div>
          ))
        )}
      </div>
    </div>
  ));
};

const RoadmapContainer: React.FC = () => {
  const [data, setData] = useState<{ department: string, streams: DataType[] }[]>([]);

  useEffect(() => {
    const parsedData = roadmapData.map((department) => {
      const departmentData = department.streams.map((stream, streamIndex) => ({
        key: `${stream.streamLabel}-${streamIndex}`,
        stream: stream.streamLabel,
        items: generateItems(stream.groups),
      }));
      return {
        department: department.department,
        streams: departmentData,
      };
    });
    setData(parsedData);
  }, []);

  return (
    <>
      {data.map((dept, index) => (
        <div className="card-container" key={index}>
          <div className="card-content">
            <div className="card-header">{dept.department} Roadmap</div>
            <div className="header-row">
              <div className="header-cell">Streams/Month</div>
              <div className="header-cell">Items</div>
              <div className="header-cell">Jan</div>
              <div className="header-cell">Feb</div>
              <div className="header-cell">Mar</div>
              <div className="header-cell">Apr</div>
              <div className="header-cell">May</div>
              <div className="header-cell">Jun</div>
              <div className="header-cell">Jul</div>
              <div className="header-cell">Aug</div>
              <div className="header-cell">Sep</div>
              <div className="header-cell">Oct</div>
              <div className="header-cell">Nov</div>
              <div className="header-cell">Dec</div>
            </div>
            <div className="streams">
              {dept.streams.map((stream, streamIndex) => (
                <React.Fragment key={stream.key}>
                  <div className="stream">
                    <div className="stream-label">{stream.stream}</div>
                    <div className="stream-items">{stream.items}</div>
                    <div className="month-cell"></div>
                    <div className="month-cell"></div>
                    <div className="month-cell"></div>
                    <div className="month-cell"></div>
                    <div className="month-cell"></div>
                    <div className="month-cell"></div>
                    <div className="month-cell"></div>
                    <div className="month-cell"></div>
                    <div className="month-cell"></div>
                    <div className="month-cell"></div>
                    <div className="month-cell"></div>
                    <div className="month-cell"></div>
                  </div>
                  {streamIndex === dept.streams.length - 1 ? null : <div className="divider" />}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="card-actions">
            <button className="learn-more">Learn More</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default RoadmapContainer;
