import { TocItem } from '@/lib/htmljsonToc';

interface TocProps {
  tocItems: TocItem[];
  scrollContainer?: string; // 滚动容器选择器
}

const Toc = ({ tocItems, scrollContainer = 'window' }: TocProps) => {
  // 滚动到锚点
  const scrollToHeading = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    const container = document.querySelector(scrollContainer);

    if (container) {
      const top = target.getBoundingClientRect().top + container.scrollTop - 80;
      container.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // 递归渲染目录项
  const renderTocItems = (items: TocItem[]) => (
    <ul className="toc-list">
      {items.map((item) => (
        <li key={item.id} className="py-1">
          <a
            onClick={() => scrollToHeading(item.id!)}
            data-level={item.level}
            className="data-[level=1]:pl-0 data-[level=1]:pt-2
                  data-[level=1]:border-t border-solid border-dark/40
                  data-[level=2]:pl-4
                  data-[level=3]:pl-6
                  sm:data-[level=2]:pl-6
                  sm:data-[level=3]:pl-10
                  flex items-center justify-start"
          >
            {item.level === 2 && (
              <span className="flex w-1 h-1 rounded-full bg-black mr-2">
                &nbsp;
              </span>
            )}
            {item.level === 3 && <span className="mr-2">-</span>}
            <span className="hover:underline">{item.text}</span>
          </a>
          {item.children.length > 0 && renderTocItems(item.children)}
        </li>
      ))}
    </ul>
  );

  return <div className="toc-container">{renderTocItems(tocItems)}</div>;
};

export default Toc;
