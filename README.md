# EscapeQuotes

An extension for VS Code that allows you to escape quotes in the selected string.

https://github.com/milovidov983/EscapeQuotes


After installing the extension, when you select text and right-click on it, a new *Escape quotes* menu will appear.

### Example

Before:

```
Select * from "Table" where exists(select 1 from jsonb_array_elements("Data"->'users') v where v->'job'->'some'->>'foo'='0')
```

After:

```
Select * from \"Table\" where exists(select 1 from jsonb_array_elements(\"Data\"->\'users\') v where v->\'job\'->\'some\'->>\'foo\'=\'0\')
```

