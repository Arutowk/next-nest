type Item = {
  url: string;
  title: string;
  items: Item[];
};

type Props = {
  item: Item;
  level: 'two' | 'three';
};
export default function TableOfContentsItem({ item, level = 'two' }: Props) {
  return (
    <li className="py-1">
      <a
        href={item.url}
        data-level={level}
        className="data-[level=two]:pl-0 data-[level=two]:pt-2
                  data-[level=two]:border-t border-solid border-dark/40
                  data-[level=three]:pl-4
                  sm:data-[level=three]:pl-6
                  flex items-center justify-start"
      >
        {level === 'three' && (
          <span className="flex w-1 h-1 rounded-full bg-dark mr-2">&nbsp;</span>
        )}
        <span className="hover:underline">{item.title}</span>
      </a>
      {item.items.length > 0 && (
        <ul className="mt-1">
          {item.items.map((subItem) => (
            <TableOfContentsItem
              key={subItem.url}
              item={subItem}
              level="three"
            />
          ))}
        </ul>
      )}
    </li>
  );
}
