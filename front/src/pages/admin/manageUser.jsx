import React, { useState, useEffect } from "react";
import { Table, Button, Input, Space, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import styled from "styled-components";

const StyledWrapper = styled.div`
  padding: 24px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .search-bar {
    width: 300px;
  }
`;

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const fetchUsers = async () => {
    try {
      //   setLoading(true);
      //   const response = await axiosInstance.get("/api/admin/users");
      //   setUsers(response.data);
    } catch (error) {
      message.error("사용자 목록을 불러오는데 실패했습니다.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleStatusChange = async (userId, newStatus) => {
    try {
      //   await axiosInstance.patch(`/api/admin/users/${userId}/status`, {
      //     status: newStatus,
      //   });
      message.success("사용자 상태가 변경되었습니다.");
      fetchUsers();
    } catch (error) {
      message.error("사용자 상태 변경에 실패했습니다.");
      console.error(error);
    }
  };

  const columns = [
    {
      title: "이메일",
      dataIndex: "email",
      key: "email",
      filteredValue: [searchText],
      onFilter: (value, record) =>
        record.email.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "닉네임",
      dataIndex: "nickname",
      key: "nickname",
    },
    {
      title: "가입일",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "유저상태",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span style={{ color: status === "active" ? "green" : "red" }}>
          {status === "active" ? "활성" : "비활성"}
        </span>
      ),
    },
    {
      title: "관리",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type={record.status === "active" ? "danger" : "primary"}
            onClick={() =>
              handleStatusChange(
                record.id,
                record.status === "active" ? "inactive" : "active"
              )
            }
          >
            {record.status === "active" ? "비활성화" : "활성화"}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <StyledWrapper>
      <div className="header">
        <h2>회원관리</h2>
        <Input
          placeholder="이메일로 검색"
          prefix={<SearchOutlined />}
          className="search-bar"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <Table
        columns={columns}
        dataSource={users}
        loading={loading}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showTotal: (total) => `총 ${total}개의 항목`,
        }}
      />
    </StyledWrapper>
  );
};

export default ManageUser;
