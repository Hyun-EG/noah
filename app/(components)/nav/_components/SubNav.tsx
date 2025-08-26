"use client";

import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { iconBtn } from "../variants";

const SubNav = () => {
  const [isShowSubNav, setIsShowSubNav] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          setIsShowSubNav((prev) => (prev ? false : true));
        }}
        type="button"
        aria-label="메뉴 열기"
        className={iconBtn({ size: "md", subtle: true })}
      >
        <FiMenu size={24} />
      </button>
      {isShowSubNav && (
        <div className="absolute top-12 right-0 w-44 min-h-screen border-l bg-white dark:bg-black">
          <div>sd</div>
        </div>
      )}
    </>
  );
};

export default SubNav;
