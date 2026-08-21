# Date, time, and navigation vocabulary

## Date and time controls

### Date input — 日期输入框

Use native input for a simple single date when consistent custom calendar visuals are not required.

```tsx
<label>生日<input type="date" value={date} max={today} onChange={e=>setDate(e.target.value)} /></label>
```

### Date picker — 日期选择器

Single date selected from a calendar popover. Define locale, week start, disabled dates, and input format.

```tsx
<DatePicker value={date} onValueChange={setDate} locale="zh-CN" disabledDate={d=>d<today} />
```

### Date range picker — 日期范围选择器

Select start and end dates as one value; clarify inclusive endpoints and invalid ordering.

```tsx
<DateRangePicker value={{from,to}} onValueChange={({from,to})=>{setFrom(from);setTo(to)}} minNights={1} />
```

### Multiple-date picker — 多日期选择器

```tsx
<Calendar mode="multiple" selected={dates} onSelect={setDates} max={10} />
```

### Month picker — 月份选择器

```tsx
<label>账期<input type="month" value={month} onChange={e=>setMonth(e.target.value)} /></label>
```

### Year picker — 年份选择器

```tsx
<Select value={year} options={years.map(String)} onValueChange={setYear} aria-label="年份" />
```

### Week picker — 周选择器

```tsx
<label>统计周<input type="week" value={week} onChange={e=>setWeek(e.target.value)} /></label>
```

### Time picker — 时间选择器

```tsx
<label>开始时间<input type="time" value={time} step={900} onChange={e=>setTime(e.target.value)} /></label>
```

### Date-time picker — 日期时间选择器

Specify timezone and whether the stored value is local or absolute.

```tsx
<DateTimePicker value={startsAt} timezone="Asia/Shanghai" minuteStep={15} onValueChange={setStartsAt} />
```

### Time range picker — 时间范围选择器

```tsx
<TimeRangePicker value={[startTime,endTime]} onValueChange={setTimeRange} minuteStep={30} />
```

### Calendar — 日历视图

An always-visible month/week/day surface, not merely a picker.

```tsx
<CalendarView view="week" events={events} date={focusDate} onEventSelect={openEvent} />
```

### Date presets — 日期快捷范围

```tsx
<DateRangePicker presets={[{label:'最近 7 天',value:last7Days},{label:'本月',value:thisMonth}]} value={range} onValueChange={setRange} />
```

## Navigation menus

### Top navigation / navbar — 顶部导航栏

```tsx
<nav aria-label="主导航"><a href="/overview" aria-current="page">概览</a><a href="/reports">报表</a></nav>
```

### Standard sidebar — 标准侧边栏

Persistent vertical navigation attached to the viewport edge.

```tsx
<aside><nav aria-label="工作台"><NavItem href="/home" icon={Home}>首页</NavItem><NavItem href="/orders" icon={Box}>订单</NavItem></nav></aside>
```

### Floating sidebar — 悬浮式侧边栏

The video calls this “悬浮导式”; normalize to the established term “悬浮式侧边栏 / floating sidebar”. It has outer margins and reads as an independent navigation card.

```tsx
<aside className="fixed inset-y-4 left-4 w-64 rounded-2xl border bg-surface shadow-lg"><AppNav /></aside>
```

### Curved wheel navigation — 弧形滚轮式导航

A highly visual carousel-like navigation where items move along an arc. Use only when spatial motion adds value; keep a linear accessible fallback.

```tsx
<nav aria-label="场景"><ul className="arc-wheel">{items.map((x,i)=><li data-active={i===active}><button onClick={()=>setActive(i)}>{x.label}</button></li>)}</ul></nav>
```

### Multi-level sidebar — 多级侧边栏

Parent items expand nested navigation groups. The video transcription “负极” should be understood as “父级”.

```tsx
<nav aria-label="管理后台"><Disclosure label="系统管理"><a href="/users">用户</a><a href="/roles">角色</a></Disclosure></nav>
```

### Collapsible sidebar / rail — 可折叠侧边栏 / 导航轨

Expanded state shows icons and labels; collapsed state retains icons with accessible names and tooltips.

```tsx
<aside data-collapsed={collapsed}><button aria-expanded={!collapsed} onClick={()=>setCollapsed(!collapsed)}>切换导航</button><NavItems showLabels={!collapsed} /></aside>
```

### Off-canvas sidebar — 隐藏式侧边栏 / 滑入导航

Enters from the edge after a menu trigger; behaves like a modal drawer on narrow screens.

```tsx
<button aria-controls="mobile-nav" aria-expanded={open} onClick={()=>setOpen(true)}>菜单</button><Drawer id="mobile-nav" side="left" open={open} onOpenChange={setOpen}><AppNav /></Drawer>
```

### Navigation drawer — 导航抽屉

Material-style persistent, dismissible, or modal navigation surface. State the mode explicitly.

```tsx
<NavigationDrawer variant="dismissible" open={open} onOpenChange={setOpen} items={routes} />
```

### Mega menu — 大型导航菜单

```tsx
<MegaMenu trigger="解决方案" columns={solutionGroups} featured={featuredCase} />
```

### Context menu — 右键菜单 / 上下文菜单

Commands depend on the clicked object. Provide keyboard alternatives.

```tsx
<ContextMenu targetRef={rowRef}><MenuItem onSelect={rename}>重命名</MenuItem><MenuItem onSelect={remove}>删除</MenuItem></ContextMenu>
```

### Menubar — 菜单栏

Desktop-style persistent command categories with arrow-key navigation.

```tsx
<div role="menubar"><Menu trigger="文件"><MenuItem onSelect={save}>保存</MenuItem></Menu><Menu trigger="编辑"><MenuItem onSelect={undo}>撤销</MenuItem></Menu></div>
```

### Command palette — 命令面板

Keyboard-first searchable commands, commonly opened with Cmd/Ctrl+K.

```tsx
<CommandPalette open={open} onOpenChange={setOpen} shortcut="Mod+K" commands={commands} onSelect={runCommand} />
```

## Page and in-page navigation

### Tabs — 标签页

Switch peer content panels without changing context. Arrow keys move between tabs.

```tsx
<Tabs value={tab} onValueChange={setTab}><TabList aria-label="订单"><Tab value="all">全部</Tab><Tab value="pending">待处理</Tab></TabList><TabPanel value="all"><AllOrders /></TabPanel></Tabs>
```

### Browser-like tabs — 文档标签 / 可关闭标签页

For multiple working documents; specify close, dirty, reorder, and overflow behavior.

```tsx
<DocumentTabs items={docs} activeId={activeId} onActivate={setActiveId} onClose={closeDoc} reorderable />
```

### Breadcrumb — 面包屑导航

```tsx
<nav aria-label="面包屑"><ol><li><a href="/">首页</a></li><li><a href="/products">产品</a></li><li aria-current="page">详情</li></ol></nav>
```

### Pagination — 分页器

```tsx
<nav aria-label="分页"><a href="?page=1">上一页</a><a href="?page=2" aria-current="page">2</a><a href="?page=3">下一页</a></nav>
```

### Cursor pagination / load more — 游标分页 / 加载更多

```tsx
<button disabled={!nextCursor||loading} onClick={()=>loadMore(nextCursor)}>{loading?'加载中…':'加载更多'}</button>
```

### Infinite scroll — 无限滚动

Use for exploratory feeds, not goal-oriented result sets. Preserve position and provide an accessible fallback.

```tsx
<InfiniteList items={items} loadMore={loadMore} hasMore={hasMore} fallback={<button onClick={loadMore}>加载更多</button>} />
```

### Stepper / wizard steps — 步骤条 / 向导步骤

Represents progress through a multi-step task, not numeric loading progress.

```tsx
<ol aria-label="开户步骤">{steps.map((x,i)=><li aria-current={i===step?'step':undefined} data-complete={i<step}>{x}</li>)}</ol>
```

### Anchor navigation / table of contents — 锚点导航 / 目录

```tsx
<nav aria-label="本文目录"><a href="#api">API</a><a href="#examples">示例</a></nav>
```

### Bottom navigation — 底部导航栏

Use three to five primary mobile destinations.

```tsx
<nav aria-label="主要页面" className="fixed bottom-0"><a href="/home" aria-current="page">首页</a><a href="/inbox">消息</a><a href="/me">我的</a></nav>
```

## Additional temporal and navigation variants

### Duration input — 时长输入

Use for elapsed quantities rather than a time of day. Store one canonical unit and derive the grouped display.

```tsx
<DurationInput valueSeconds={duration} units={['hours','minutes']} onValueChange={setDuration} />
```

### Recurrence editor — 重复规则编辑器

Use for schedules with frequency, interval, weekdays, and an end condition. Always render a human-readable summary of the generated rule.

```tsx
<RecurrenceEditor value={rule} timezone="Asia/Shanghai" onChange={setRule} /><output>{summarizeRule(rule)}</output>
```

### Content switcher — 内容切换器

Use for alternate views of the same related content, such as grid/list or all/read/unread. Use tabs for distinct information sections and a switch for an immediate binary setting.

```tsx
<ContentSwitcher value={view} onValueChange={setView} options={[{value:'grid',label:'网格'},{value:'list',label:'列表'}]} />
```

### Navigation rail — 导航轨

Use a compact persistent rail for a small set of high-level desktop/tablet destinations. It is not a collapsed deep tree; labels must remain discoverable.

```tsx
<nav aria-label="主导航" className="navigation-rail">{routes.map(r=><a href={r.href} aria-current={r.active?'page':undefined}><r.icon aria-hidden /><span>{r.label}</span></a>)}</nav>
```

### Table pagination — 表格分页栏

Use when a data table needs item count, page size, and sequential page controls. Keep it attached below the table; use page-link pagination for route navigation.

```tsx
<TablePagination page={page} pageSize={pageSize} total={total} onPageChange={setPage} onPageSizeChange={setPageSize} />
```
