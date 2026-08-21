# Date and time controls / 日期与时间控件

This file defines exactly one component family. Select subtypes by date versus time versus duration, single value versus range, recurrence, precision, timezone, and native versus custom picker.

## Decision table
| Subtype | Choose for this case | Reject or switch when | Code example / 代码示例 |
|---|---|---|---|
| Native date/time input / 原生日期时间输入 | Simple form; device-native picker is acceptable; minimal dependency | Need cross-browser identical calendar, presets, or complex disabled rules | `type="date"`, `time`, `month`, `week`, `datetime-local` |
| Date picker / 日期选择器 | One calendar date with visual month navigation | User already knows exact date and keyboard typing is faster | `editable input plus calendar dialog` |
| Date range picker / 日期范围选择器 | One related start/end interval, such as booking or report period | Dates are independent or multiple disjoint dates | `<DateRangePicker value={{from,to}} />` |
| Multiple-date picker / 多日期选择器 | Several disjoint calendar dates | User needs a continuous interval | calendar `mode="multiple"` |
| Time picker / 时间选择器 | Time-of-day with fixed precision/step | Duration is being entered | `type="time"` or time list/spinner |
| Date-time picker / 日期时间选择器 | One timestamp; timezone and storage semantics are explicit | Date and time can be collected independently without ambiguity | `<DateTimePicker timezone="…" />` |
| Calendar view / 日历视图 | Browsing/scheduling events is the main task; surface remains visible | Only a date value is needed in a form | `month/week/day calendar surface` |
| Duration input / 时长输入 | Elapsed quantity such as 2h 30m, not clock time | User is selecting a time of day | `grouped numeric fields with canonical seconds/minutes model` |

## Detailed variants

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

### Duration input — 时长输入

Use for elapsed quantities rather than a time of day. Store one canonical unit and derive the grouped display.

```tsx
<DurationInput valueSeconds={duration} units={['hours','minutes']} onValueChange={setDuration} />
```
