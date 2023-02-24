import React, { useEffect, useRef, useState } from "react";
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from "react-sortable-hoc";
import { MenuOutlined } from "@ant-design/icons";
import BaseTable from "./BaseTable";

const DragHandle = sortableHandle(({ active }) => (
  <MenuOutlined style={{ cursor: "grab", color: active ? "blue" : "#999" }} />
));

const SortableItem = sortableElement((props) => <tr {...props} />);
const SortableContainer = sortableContainer((props) => <tbody {...props} />);

function SortableBaseTable(props) {
  const {
    loading,
    columns,
    rowKey,
    data,
    pagination,
    onChange,
    changeOrderData,
  } = props;

  const [dataSource, setDataSource] = useState(data);
  const columnsData = useRef([
    {
      title: "Sort",
      dataIndex: "",
      width: 30,
      className: "drag-visible",
      render: () => (
        <>
          <DragHandle />
        </>
      ),
    },
    ...columns,
  ]);

  useEffect(() => {
    setDataSource(data);
  }, [data]);

  const merge = (a, b, i = 0) => {
    let aa = [...a];
    return [...a.slice(0, i), ...b, ...aa.slice(i, aa.length)];
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    let tempDataSource = [...dataSource];

    if (oldIndex !== newIndex) {
      let movingItem = tempDataSource[oldIndex];
      tempDataSource.splice(oldIndex, 1);
      tempDataSource = merge(tempDataSource, [movingItem], newIndex);

      const params = [
        {
          id: dataSource[oldIndex].id,
          newOrder: dataSource[newIndex].orderSort,
        },
        {
          id: dataSource[newIndex].id,
          newOrder: dataSource[oldIndex].orderSort,
        },
      ];

      // changeOrderData({ params });
      setDataSource(tempDataSource);
    }
  };

  const DraggableContainer = (props) => (
    <SortableContainer
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );

  const DraggableBodyRow = ({ className, style, ...restProps }) => {
    const index = dataSource.findIndex(
      (x) => x.key === restProps["data-row-key"]
    );

    return <SortableItem index={index} {...restProps} />;
  };

  return (
    <BaseTable
      loading={loading}
      columns={columnsData.current}
      rowKey={rowKey}
      dataSource={dataSource}
      pagination={pagination}
      onChange={onChange}
      components={{
        body: {
          wrapper: DraggableContainer,
          row: DraggableBodyRow,
        },
      }}
    />
  );
}

export default SortableBaseTable;
