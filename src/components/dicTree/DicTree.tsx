import React, { useMemo, useState } from 'react';
import { Input, Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';
import style from './dicTree.module.less'
const { Search } = Input;

type Props = {
  originTreeData: TreeNode[];
  showDetail: (path: String) => void;
}

interface TreeNode {
  title: string;
  children?: TreeNode[];
}

const DicTree: React.FC<Props> = (props: Props) => {
  console.log('props', props);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  // treeData生成key
  const generateKey = (tree: TreeNode[]): DataNode[] => {
    let keyIndex = 0;

    const addKey = (node: TreeNode, parentKey?: string, index?: number): DataNode => {
      const dataNode: DataNode = {
        key: parentKey ? `${parentKey}-${index}` : (index != null ? index.toString() : ''),
        title: node.title,
      };
      if (node.children) {
        dataNode.children = node.children.map((child, i) => addKey(child, dataNode.key.toString(), i));
      }
      return dataNode;
    };
    return tree.map((node) => {
      const dataNode = addKey(node, undefined, keyIndex);
      keyIndex++;
      return dataNode;
    });
  };
  const defaultData = generateKey(props.originTreeData);
  // console.log('defaultData', defaultData);

  const dataList: { key: React.Key; title: string }[] = [];

  // 生成扁平化的数据列表
  const generateList = (data: DataNode[]) => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const { key, title } = node;
      dataList.push({ key, title: title as string });
      if (node.children) {
        generateList(node.children);
      }
    }
  };
  generateList(defaultData);
  // console.log('dataList', dataList);

  // 根据子节点找到父节点的key
  const getParentKey = (key: React.Key, tree: DataNode[]): React.Key => {
    let parentKey: React.Key;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some((item) => item.key === key)) {
          parentKey = node.key;
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    }
    return parentKey!;
  };

  // 展开
  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  // 搜索
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log('value', value);
    const newExpandedKeys = dataList
      .map((item) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, defaultData);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    setExpandedKeys(newExpandedKeys as React.Key[]);
    setSearchValue(value);
    setAutoExpandParent(true);
  };

  // 点击
  const onClickItem = (selectedKeys: React.Key[], info: any) => {
    if (info.node.children) onExpand([info.node.key])
    else {
      const parentKey = getParentKey(info.node.key, defaultData);
      const ownTitle = dataList.find(item => item.key === selectedKeys[0])?.title
      if (parentKey) {
        const parentTitle = dataList.find(item => item.key === parentKey)?.title
        props.showDetail(parentTitle + "/" + ownTitle)
      } else {
        props.showDetail(ownTitle as string)
      }
    }
  }

  // 根据搜索关键字生成包含高亮效果的树形数据
  const treeData = useMemo(() => {
    const loop = (data: DataNode[]): DataNode[] =>
      data.map((item) => {
        const strTitle = item.title as string;
        const index = strTitle.indexOf(searchValue);
        const beforeStr = strTitle.substring(0, index);
        const afterStr = strTitle.slice(index + searchValue.length);
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span style={{ color: '#f50' }}>{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span>{strTitle}</span>
          );
        if (item.children) {
          return { title, key: item.key, children: loop(item.children) };
        }

        return {
          title,
          key: item.key,
        };
      });

    return loop(defaultData);
  }, [defaultData, searchValue]);

  console.log('defaultData', defaultData);
  console.log('treeData', treeData);


  return (
    <div className={style.layout}>
      <Search className={style.search} placeholder="Search" onChange={onChange} />
      <Tree
        className={style.tree}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        treeData={treeData}
        onExpand={onExpand}
        onSelect={onClickItem}
      />
    </div>
  );
};

export default DicTree;
